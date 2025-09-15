'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ProgressBarProps {
  color?: string;
  height?: string;
  minIncrement?: number;
  maxIncrement?: number;
  trickleInterval?: number;
  finishDelay?: number;
  initialPercent?: number;
  maxTricklePercent?: number;
}

export function ProgressBar({
  color = '#db2777',
  height = '4px',
  minIncrement = 1,
  maxIncrement = 7,
  trickleInterval = 200,
  finishDelay = 400,
  initialPercent = 10,
  maxTricklePercent = 85,
}: ProgressBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [percent, setPercent] = useState(0);
  const isActive = useRef(false);
  const trickleTimer = useRef<number | null>(null);
  const previousPath = useRef(pathname);

  function startProgress() {
    if (isActive.current) return;
    isActive.current = true;
    setPercent(initialPercent);

    trickleTimer.current = window.setInterval(() => {
      setPercent((p) =>
        Math.min(
          maxTricklePercent,
          p + minIncrement + Math.random() * (maxIncrement - minIncrement)
        )
      );
    }, trickleInterval);
  }

  const finishProgress = useCallback(() => {
    stopTrickle();
    setPercent(100);

    setTimeout(() => {
      setPercent(0);
      isActive.current = false;
    }, finishDelay);
  }, [finishDelay]);

  function stopTrickle() {
    if (trickleTimer.current !== null) {
      clearInterval(trickleTimer.current);
      trickleTimer.current = null;
    }
  }

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      finishProgress();
    }
  }, [finishProgress, pathname]);

  useEffect(() => {
    function handleLinkClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:'))
        return;

      const url = new URL(href, window.location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search)
        return;

      e.preventDefault();
      startProgress();

      const destination = url.pathname + url.search + url.hash;

      if (typeof document.startViewTransition === 'function') {
        document.startViewTransition(() => router.push(destination));
      } else {
        router.push(destination);
      }
    }

    window.addEventListener('click', handleLinkClick, true);
    return () => {
      window.removeEventListener('click', handleLinkClick, true);
      stopTrickle();
    };
  }, [router]);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height,
        backgroundColor: color,
        zIndex: 40,
        width: `${percent}%`,
        opacity: percent > 0 ? 1 : 0,
        transition: percent > 0 ? 'all 300ms ease-out' : 'none',
        pointerEvents: 'none',
      }}
    />
  );
}
