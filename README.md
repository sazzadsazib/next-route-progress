
# Next.js Route Progress Bar

A lightweight, customizable route change progress bar for **Next.js App Router** (`next/navigation`).  
Supports client-side navigation, smooth trickle animations, and configurable behavior.  

---

## 📦 Installation

### 1. Install via NPM

If published to NPM:

```bash
npm install next-route-progress
# or
yarn add next-route-progress
```

### 2. Install Locally

If using as a local package:

```bash
# In your library folder
npm run build
npm link

# In your Next.js app
npm link next-route-progress
```

---

## 🛠 Usage

### Basic Usage

```tsx
'use client';
import { ProgressBar } from 'next-route-progress';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
```

---

### Full Props Example

```tsx
<ProgressBar
  color="#2563eb"            // bar color (Tailwind blue-600)
  height="3px"               // bar thickness
  initialPercent={5}         // start percent when progress begins
  minIncrement={1}           // minimum increment per tick
  maxIncrement={6}           // maximum increment per tick
  trickleInterval={150}      // ms between each tick
  finishDelay={500}          // delay before resetting to 0
  maxTricklePercent={80}     // maximum width % while trickling
/>
```

---

## ⚙️ Props

| Prop                | Type     | Default   | Description |
|--------------------|----------|-----------|-------------|
| `color`             | `string` | `'#db2777'` | Progress bar color |
| `height`            | `string` | `'4px'`  | Thickness of the progress bar |
| `initialPercent`    | `number` | `10`     | Percent when progress starts |
| `minIncrement`      | `number` | `1`      | Minimum percent added per tick |
| `maxIncrement`      | `number` | `7`      | Maximum percent added per tick |
| `trickleInterval`   | `number` | `200`    | Interval (ms) between increments |
| `finishDelay`       | `number` | `400`    | Delay before resetting to 0 after completion |
| `maxTricklePercent` | `number` | `85`     | Maximum width % while trickling |

---

## ⚡ Features

- Works with **Next.js App Router** (`next/navigation`)  
- Smooth **trickle animation** while loading  
- Instant reset to `0%` after completion  
- Fully **customizable via props**  
- Pure **inline styles**, no Tailwind dependency  

---

## 🔧 Example with Custom Settings

```tsx
<ProgressBar
  color="#f97316"      
  height="5px"
  initialPercent={5}
  minIncrement={2}
  maxIncrement={5}
  trickleInterval={100}
  finishDelay={600}
  maxTricklePercent={90}
/>
```

- Bar starts at **5%**  
- Slowly grows with random increments between 2–5% every 100ms  
- Max trickle stops at **90%**, then finishes to 100% when navigation completes  
- Resets to 0% after 600ms  

---

## 🔗 Notes

- The component should be placed **once per app**, ideally in `app/layout.tsx` around `<body>`  
- Works **automatically on link clicks** (`<a href>`), intercepting navigation  
- Compatible with **Next.js 13+ App Router**  
