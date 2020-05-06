import { LayoutConfig } from './types'

export const presets = {
  createDefaultLayout(): LayoutConfig {
    return {
      clipped: false,
      collapsible: {
        xs: false,
        sm: true,
      },
      collapsedWidth: 64,
      footerShrink: true,
      navAnchor: 'left',
      navVariant: {
        xs: 'temporary',
        sm: 'permanent',
      },
      navWidth: 256,
      headerPosition: 'relative',
      squeezed: true,
    }
  },
  createFixedLayout: (config?: LayoutConfig): LayoutConfig => ({
    ...presets.createDefaultLayout(),
    clipped: true,
    squeezed: true,
    headerPosition: 'sticky',
    ...config,
  }),
  createContentBasedLayout: (config?: LayoutConfig): LayoutConfig => ({
    ...presets.createDefaultLayout(),
    navWidth: {
      sm: 200,
      md: 256,
    },
    navVariant: {
      xs: 'temporary',
      sm: 'persistent',
    },
    collapsible: false,
    ...config,
  }),
  createCozyLayout: (config?: LayoutConfig): LayoutConfig => ({
    ...presets.createDefaultLayout(),
    navVariant: {
      xs: 'persistent',
      sm: 'permanent',
    },
    navWidth: {
      sm: 200,
      md: 256,
      xs: 64,
    },
    clipped: false,
    ...config,
  }),
}
