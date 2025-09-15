import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Entry point
  format: ['esm', 'cjs'], // Support both ES Modules & CommonJS
  dts: true, // Generate .d.ts type declarations
  sourcemap: true, // Enable source maps for debugging
  minify: true, // Minify output
  clean: true, // Clean dist/ before building
  treeshake: true, // Remove unused exports for smaller bundle
  target: 'es2020', // Modern JS target
  external: ['react', 'react-dom', 'next/navigation'], // Don't bundle peer deps
});
