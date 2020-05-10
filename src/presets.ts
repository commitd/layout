import { LayoutConfig } from './types'

/**
 * A set of preset layouts for the most common scenarios.
 * When providing a config it is merged on to the default so only changes from the default need to be specified.
 */
export const presets = {
  createDefaultLayout(config?: Partial<LayoutConfig>): Partial<LayoutConfig> {
    return {
      collapsible: {
        xs: false,
        sm: true,
      },
      navVariant: {
        xs: 'temporary',
        sm: 'permanent',
      },
      headerPosition: 'relative',
      headerResponse: {
        xs: 'static',
        sm: 'squeezed',
      },
      contentResponse: {
        xs: 'static',
        sm: 'squeezed',
      },
      footerResponse: {
        xs: 'static',
        sm: 'squeezed',
      },
      ...config,
    }
  },
  createFixedLayout: (config?: Partial<LayoutConfig>): Partial<LayoutConfig> =>
    presets.createDefaultLayout({
      headerPosition: 'sticky',
      headerResponse: 'clipped',
      contentResponse: 'squeezed',
      footerResponse: 'squeezed',
      ...config,
    }),
  createContentBasedLayout: (
    config?: Partial<LayoutConfig>
  ): Partial<LayoutConfig> =>
    presets.createDefaultLayout({
      navWidth: {
        sm: 200,
        md: 256,
      },
      navVariant: {
        xs: 'temporary',
        sm: 'persistent',
      },
      collapsible: false,
      headerResponse: {
        xs: 'static',
        sm: 'pushed',
      },
      contentResponse: {
        xs: 'static',
        sm: 'pushed',
      },
      footerResponse: {
        xs: 'static',
        sm: 'pushed',
      },
      ...config,
    }),
  createCozyLayout: (config?: Partial<LayoutConfig>): Partial<LayoutConfig> =>
    presets.createDefaultLayout({
      navVariant: {
        xs: 'persistent',
        sm: 'permanent',
      },
      navWidth: {
        sm: 200,
        md: 256,
        xs: 64,
      },
      ...config,
    }),
}
