import { DocsContainer } from './components/DocsContainer.jsx'

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
    container: DocsContainer,
  },
}
