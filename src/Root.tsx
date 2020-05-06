import React, {
  useState,
  useMemo,
  CSSProperties,
  createContext,
  HTMLAttributes,
  ReactNode,
  ElementType,
} from 'react'
import { presets } from './presets'
import { useWidth, makeStyles } from '@committed/components'
import { LayoutConfig, Layout, Breakpoint, ScreenProps } from './types'

export interface RootProps {
  className?: string
  component?: ElementType<HTMLAttributes<HTMLElement>>
  config?: Partial<LayoutConfig>
  style?: CSSProperties
  children?: ReactNode
}

function defaultContext(): Layout {
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
    headerPosition: 'relative',
    squeezed: true,
    screen: 'xl',
    setCollapsed: () => null,
    setOpen: () => null,
  }
}

const keys: Array<Breakpoint> = ['xs', 'sm', 'md', 'lg', 'xl']

function getScreenValue<S>(
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

const initialConfig = presets.createDefaultLayout()
export const LayoutContext = createContext(defaultContext())

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const createNewContext = (
  config: Partial<LayoutConfig>,
  width: Breakpoint,
  open: boolean,
  collapsed: boolean,
  setOpen: (val: boolean) => any,
  setCollapsed: (val: boolean) => any
): Layout => {
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

export const Root = ({
  className = '',
  component = 'div',
  config = initialConfig,
  children,
  ...props
}: RootProps) => {
  const Component = component
  const width = useWidth()
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)

  const value = useMemo(
    () =>
      createNewContext(config, width, open, collapsed, setOpen, setCollapsed),
    [config, width, open, collapsed]
  )

  return (
    <LayoutContext.Provider value={value}>
      <Component className={`${className} ${classes.root}`} {...props}>
        {typeof children === 'function' ? children(value) : children}
      </Component>
    </LayoutContext.Provider>
  )
}

