import { committedLight } from './committed/theme.js'

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Components',
        ['Root', 'Header', 'Content', 'Nav', 'NavListItem', 'Footer'],
        'Hooks',
        'Examples',
      ],
    },
  },
  docs: {
    theme: committedLight,
  },
}
