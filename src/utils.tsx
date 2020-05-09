import { presets } from './presets'
import { LayoutConfig, Layout, Breakpoint, ScreenProps } from './types'

const keys: Array<Breakpoint> = ['xs', 'sm', 'md', 'lg', 'xl']
const initialConfig = presets.createDefaultLayout()

/**
 * Base settings for context values.
 * These are used if none set.
 */
export function defaultContext(): Layout {
  return {
    clipped: false,
    collapsible: true,
    collapsedWidth: 64,
    collapsed: false,
    footerShrink: true,
    navAnchor: 'left',
    navVariant: 'permanent',
    open: true,
    navWidth: 256,
    currentNavWidth: 256,
    headerPosition: 'relative',
    squeezed: true,
    screen: 'xl',
    setCollapsed: () => null,
    setOpen: () => null,
  }
}

/**
 * Get the value for the current screen size, from the given config value.
 */
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

  // track down to next smallest set
  const screenMap: ScreenProps<S> = val
  let index = keys.indexOf(currentScreen)
  while (index >= 0) {
    if (screenMap[keys[index]] !== undefined) {
      return screenMap[keys[index]] as S
    }
    index -= 1
  }

  // else track up to next largest set
  index = keys.indexOf(currentScreen)
  while (index < keys.length) {
    if (screenMap[keys[index]] !== undefined) {
      return screenMap[keys[index]] as S
    }
    index += 1
  }

  throw Error('Config not valid')
}

/**
 * Get the current Nav width, based on the settings.
 */
export const getNavWidth = ({
  navWidth,
  navVariant,
  collapsible,
  collapsed,
  collapsedWidth,
  open,
}: Omit<Layout, 'currentNavWidth'>) => {
  if (navVariant === 'permanent' || open) {
    if (collapsible) {
      if (collapsed) return collapsedWidth
      return navWidth
    }
    return navWidth
  }
  return 0
}

/**
 * Create a context from the config and current width and settings.
 */
export const createNewContext = (
  config: Partial<LayoutConfig>,
  width: Breakpoint,
  open: boolean,
  collapsed: boolean,
  setOpen: (val: boolean) => any,
  setCollapsed: (val: boolean) => any
): Omit<Layout, 'currentNavWidth'> => {
  const {
    clipped,
    collapsible,
    collapsedWidth,
    navVariant,
    navWidth,
    navAnchor,
    headerPosition,
    squeezed,
    footerShrink,
  } = config

  return {
    open,
    collapsed,
    clipped: getScreenValue(width, clipped, initialConfig.clipped),
    collapsible: getScreenValue(width, collapsible, initialConfig.collapsible),
    collapsedWidth: getScreenValue(
      width,
      collapsedWidth,
      initialConfig.collapsedWidth
    ),
    navVariant: getScreenValue(width, navVariant, initialConfig.navVariant),
    navWidth: getScreenValue(width, navWidth, initialConfig.navWidth),
    navAnchor: getScreenValue(width, navAnchor, initialConfig.navAnchor),
    headerPosition: getScreenValue(
      width,
      headerPosition,

      initialConfig.headerPosition
    ),
    squeezed: getScreenValue(width, squeezed, initialConfig.squeezed),
    footerShrink: getScreenValue(
      width,
      footerShrink,
      initialConfig.footerShrink
    ),
    screen: width,
    setOpen: (val: boolean | object) =>
      setOpen(typeof val === 'object' ? !open : val),
    setCollapsed: (val: boolean | object) =>
      setCollapsed(typeof val === 'object' ? !collapsed : val),
  }
}
