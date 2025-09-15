import * as react_jsx_runtime from 'react/jsx-runtime';

interface ProgressBarProps {
    color?: string;
    height?: string;
    minIncrement?: number;
    maxIncrement?: number;
    trickleInterval?: number;
    finishDelay?: number;
    initialPercent?: number;
    maxTricklePercent?: number;
}
declare function ProgressBar({ color, height, minIncrement, maxIncrement, trickleInterval, finishDelay, initialPercent, maxTricklePercent, }: ProgressBarProps): react_jsx_runtime.JSX.Element;

export { ProgressBar, type ProgressBarProps };
