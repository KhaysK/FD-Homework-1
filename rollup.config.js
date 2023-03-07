import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
    input: './script.ts',
    output: { file: './bundle.js' },
    plugins: [typescript(), terser()],
  };