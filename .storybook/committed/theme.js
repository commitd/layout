import { create } from '@storybook/theming'

const overrides = {
  colorPrimary: '#ffbb00',
  colorSecondary: '#4098D7',

  // Typography
  fontBase:
    '-apple-system, BlinkMacSystemFont, "San Francisco", Roboto,  "Segoe UI", "Helvetica Neue"', // fonts.defaultFonts.typography.fontFamily,
  fontCode:
    '"SFMono-Regular", Consolas, "Liberation Mono", "Andale Mono", "Ubuntu Mono", Menlo, Courier, monospace', // fonts.defaultFonts.monospace.fontFamily,

  brandTitle: 'Committed Layout',
  brandUrl: '/',
}

export const committedLight = create({
  ...overrides,
  base: 'light',
  brandImage: 'https://committed.software/Committed_Light.svg',
})

export const committedDark = create({
  ...overrides,
  base: 'dark',
  brandImage: 'https://committed.software/Committed_Dark.svg',
})
