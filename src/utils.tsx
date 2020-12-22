/* eslint-disable security/detect-object-injection */
import {
  Breakpoint,
  CurrentLayoutConfig,
  Layout,
  LayoutConfig,
  ScreenProps,
} from './types'

const keys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl']

/**
 * Base settings for config values.
 * These are used if none set.
 */
export const LAYOUT_CONFIG_DEFAULTS: CurrentLayoutConfig = {
  collapsible: true,
  collapsedWidth: 64,
  draggable: false,
  navAnchor: 'left',
  navVariant: 'permanent',
  navWidth: 256,
  maxNavWidth: 512,
  headerPosition: 'relative',
  headerResponse: 'squeezed',
  contentResponse: 'squeezed',
  footerResponse: 'squeezed',
}

/**
 * Base settings for context values.
 * These are used if none set.
 */
export const LAYOUT_DEFAULTS = {
  ...LAYOUT_CONFIG_DEFAULTS,
  contained: false,
  // dynamic properties
  open: true,
  collapsed: false,
  dragged: false,
  screen: 'xl',
  // setters
  setCollapsed: () => null,
  setDragged: () => null,
  setOpen: () => null,
  setNavWidth: () => null,
} as Layout

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

  throw new Error(
    `Config not valid ${currentScreen}: ${JSON.stringify(
      config
    )}, ${JSON.stringify(defaultValue)}`
  )
}

export function getScreenValues(
  currentScreen: Breakpoint,
  config: Partial<LayoutConfig>
): CurrentLayoutConfig {
  return (
    Object.keys(LAYOUT_CONFIG_DEFAULTS)
      // __docgenInfo and displaadded causes error in storybook, so filtering
      .filter((key) => !key.startsWith('_'))
      .filter((key) => key !== 'displayName')
      .reduce<CurrentLayoutConfig>(function (result, value) {
        const key = value as keyof CurrentLayoutConfig
        // @ts-ignore
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
        result[key] = getScreenValue<CurrentLayoutConfig[K]>(
          currentScreen,
          config[key],
          LAYOUT_CONFIG_DEFAULTS[key]
        )
        return result
        // eslint-disable-next-line  @typescript-eslint/prefer-reduce-type-parameter
      }, {} as CurrentLayoutConfig)
  )
}

/**
 * Get the current Nav width, based on the settings.
 */
export const getNavWidth = (
  {
    navWidth,
    navVariant,
    collapsible,
    collapsedWidth,
    maxNavWidth,
  }: CurrentLayoutConfig,
  collapsed: boolean,
  open: boolean,
  overrideNavWidth: number | null
): number => {
  if (navVariant === 'permanent' || open) {
    if (collapsible && collapsed) {
      return collapsedWidth
    }
    return Math.min(
      Math.max(overrideNavWidth ?? navWidth, collapsedWidth),
      maxNavWidth
    )
  }
  return 0
}

/**
 * Create a context from the config and current width and settings.
 */
export const createNewContext = (
  collapsed: boolean,
  config: Partial<LayoutConfig>,
  contained: boolean,
  dragged: boolean,
  open: boolean,
  overrideNavWidth: number | null,
  width: Breakpoint,
  setCollapsed: (val: boolean) => void,
  setDragged: (val: boolean) => void,
  setNavWidth: (val: number | null) => void,
  setOpen: (val: boolean) => void
): Layout => {
  const screenValues = getScreenValues(width, config)
  const navWidth = getNavWidth(screenValues, collapsed, open, overrideNavWidth)

  const { navAnchor, collapsedWidth, maxNavWidth } = screenValues
  return {
    ...screenValues,
    open,
    collapsed,
    contained,
    navWidth,
    dragged,
    screen: width,
    setCollapsed: (val: boolean | object): void =>
      setCollapsed(typeof val === 'object' ? !collapsed : val),
    setDragged: setDragged,
    setNavWidth: (screenX: number): void => {
      const newWidth =
        navAnchor === 'left'
          ? screenX - document.body.offsetLeft
          : document.body.offsetWidth - screenX
      if (newWidth > collapsedWidth && newWidth < maxNavWidth) {
        setNavWidth(newWidth)
      }
    },
    setOpen: (val: boolean | object): void =>
      setOpen(typeof val === 'object' ? !open : val),
  }
}
