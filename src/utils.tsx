/* eslint-disable security/detect-object-injection */
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
  maxNavWidth: 1256,
  headerPosition: 'relative',
  headerResponse: 'squeezed',
  contentResponse: 'squeezed',
  footerResponse: 'squeezed',
  // dynamic properties
  open: true,
  collapsed: false,
  screen: 'xl',
  currentNavWidth: 256,
  // setters
  setCollapsed: () => null,
  setOpen: () => null,
  setNavWidth: () => null,
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

  throw new Error('Config not valid')
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
}: Omit<Layout, 'currentNavWidth'>): number => {
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
  contained: boolean,
  config: Partial<LayoutConfig>,
  width: Breakpoint,
  open: boolean,
  collapsed: boolean,
  currentNavWidth: number,
  setOpen: (val: boolean) => void,
  setCollapsed: (val: boolean) => void,
  setNavWidth: (val: number) => void
): Omit<Layout, 'currentNavWidth'> => {
  const {
    collapsible,
    collapsedWidth,
    navVariant,
    navWidth,
    maxNavWidth,
    navAnchor,
    headerPosition,
    headerResponse,
    contentResponse,
    footerResponse,
  } = config

  const currentCollapsedWidth = getScreenValue(
    width,
    collapsedWidth,
    defaultContext.collapsedWidth
  )

  const currentMaxNavWidth = getScreenValue(
    width,
    maxNavWidth,
    defaultContext.maxNavWidth
  )

  const currentNavAnchor = getScreenValue(
    width,
    navAnchor,
    defaultContext.navAnchor
  )

  return {
    open,
    collapsed,
    contained,
    collapsible: getScreenValue(width, collapsible, defaultContext.collapsible),
    collapsedWidth: currentCollapsedWidth,
    navVariant: getScreenValue(width, navVariant, defaultContext.navVariant),
    navWidth: getScreenValue(width, navWidth, currentNavWidth),
    maxNavWidth: currentMaxNavWidth,
    navAnchor: currentNavAnchor,
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
    setOpen: (val: boolean | object): void =>
      setOpen(typeof val === 'object' ? !open : val),
    setCollapsed: (val: boolean | object): void =>
      setCollapsed(typeof val === 'object' ? !collapsed : val),
    setNavWidth: (screenX: number): void => {
      const newWidth =
        currentNavAnchor === 'left'
          ? screenX - document.body.offsetLeft
          : document.body.offsetWidth - screenX
      if (newWidth > currentCollapsedWidth && newWidth < currentMaxNavWidth) {
        setNavWidth(newWidth)
      }
    },
  }
}
