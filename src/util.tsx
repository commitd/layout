import { Breakpoint, LayoutConfig, ScreenProps } from './types'

const presets = {
  createDefaultLayout(): LayoutConfig {
    return {
      clipped: false,
      collapsible: {
        xs: false,
        sm: true
      },
      collapsedWidth: 64,
      footerShrink: true,
      navAnchor: 'left',
      navVariant: {
        xs: 'temporary',
        sm: 'permanent'
      },
      navWidth: 256,
      headerPosition: 'relative',
      squeezed: true
    }
  },
  createFixedLayout: (config: LayoutConfig): LayoutConfig => ({
    ...presets.createDefaultLayout(),
    navVariant: {
      xs: 'temporary',
      md: 'permanent'
    },
    collapsible: {
      xs: false,
      md: true
    },
    clipped: true,
    squeezed: true,
    headerPosition: 'sticky',
    ...config
  }),
  createContentBasedLayout: (config: LayoutConfig): LayoutConfig => ({
    ...presets.createDefaultLayout(),
    navWidth: {
      sm: 200,
      md: 256
    },
    navVariant: {
      xs: 'temporary',
      sm: 'persistent'
    },
    collapsible: false,
    ...config
  }),
  createCozyLayout: (config: LayoutConfig): LayoutConfig => ({
    ...presets.createDefaultLayout(),
    navVariant: {
      xs: 'persistent',
      sm: 'permanent'
    },
    navWidth: {
      sm: 200,
      md: 256,
      xs: 64
    },
    collapsible: {
      xs: false,
      sm: true
    },
    clipped: false,
    ...config
  }),
  createMuiTreasuryLayout: (config: LayoutConfig): LayoutConfig => ({
    ...presets.createDefaultLayout(),
    navWidth: 200,
    navVariant: {
      xs: 'temporary',
      md: 'permanent'
    },
    clipped: true,
    collapsible: false,
    ...config
  })
}

const keys: Array<Breakpoint> = ['xs', 'sm', 'md', 'lg', 'xl']

export function getScreenValue<S>(
  currentScreen: Breakpoint,
  config: S | ScreenProps<S> | undefined,
  defaultValue: S | ScreenProps<S>
): S {
  let val = config
  if (val === null || val === undefined) {
    val = defaultValue
  }
  if (typeof val !== 'object') {
    return val
  }
  const screenMap: ScreenProps<S> = val
  let index = keys.indexOf(currentScreen)
  while (index >= 0) {
    if (screenMap[keys[index]] !== undefined) {
      return screenMap[keys[index]] as S
    }
    index -= 1
  }
  throw Error('Config not valid')
}

export default presets
