import { type Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts'],
  clean: true,
  minify: true,
  target: 'esnext',
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs', 'iife'],
  injectStyle: true,
  tsconfig: 'tsconfig.json',
  ...options,
}));