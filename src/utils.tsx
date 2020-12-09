import { LayoutConfig, Layout, Breakpoint, ScreenProps } from './types'

const keys: Array<Breakpoint> = ['xs', 'sm', 'md', 'lg', 'xl']

/**
 * Base settings for context values.
 * These are used if none set.
 */
export const defaultContext: Layout = {
  collapsible: true,
  collapsedWidth: 64,
  contained: false,
  navAnchor: 'left',
  navVariant: 'permanent',
  navWidth: 256,
  headerPosition: 'relative',
  headerResponse: 'squeezed',
  contentResponse: 'squeezed',
  footerResponse: 'squeezed',
  // dynamic properties
  open: true,
  collapsed: false,
  screen: 'xl',
  currentNavWidth: 256,
  setCollapsed: () => null,
  setOpen: () => null,
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
  setCollapsed: (val: boolean) => any,
  contained: boolean
): Omit<Layout, 'currentNavWidth'> => {
  const {
    collapsible,
    collapsedWidth,
    navVariant,
    navWidth,
    navAnchor,
    headerPosition,
    headerResponse,
    contentResponse,
    footerResponse,
  } = config

  return {
    open,
    collapsed,
    contained,
    collapsible: getScreenValue(width, collapsible, defaultContext.collapsible),
    collapsedWidth: getScreenValue(
      width,
      collapsedWidth,
      defaultContext.collapsedWidth
    ),
    navVariant: getScreenValue(width, navVariant, defaultContext.navVariant),
    navWidth: getScreenValue(width, navWidth, defaultContext.navWidth),
    navAnchor: getScreenValue(width, navAnchor, defaultContext.navAnchor),
    headerPosition: getScreenValue(
      width,
      headerPosition,

      defaultContext.headerPosition
    ),
    headerResponse: getScreenValue(
      width,
      headerResponse,
      defaultContext.headerResponse
    ),
    contentResponse: getScreenValue(
      width,
      contentResponse,
      defaultContext.contentResponse
    ),
    footerResponse: getScreenValue(
      width,
      footerResponse,
      defaultContext.footerResponse
    ),
    screen: width,
    setOpen: (val: boolean | object) =>
      setOpen(typeof val === 'object' ? !open : val),
    setCollapsed: (val: boolean | object) =>
      setCollapsed(typeof val === 'object' ? !collapsed : val),
  }
}
