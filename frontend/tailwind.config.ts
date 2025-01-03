import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      height: {
        hero: '600px',
      },
      zIndex: {
        minus: '-1',
        top: '100',
      },
      rounded: {
        r: '50%',
      },
      screens: {
        filters: '1160px',
        rproducts: '1330px',
      },
    },
  },
  plugins: [],
}
export default config
