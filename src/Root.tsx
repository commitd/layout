import React, {
  useState,
  useMemo,
  CSSProperties,
  createContext,
  HTMLAttributes,
  ReactNode,
  ElementType,
} from 'react'
import presets, { getScreenValue } from './util'
import { useWidth, makeStyles } from '@committed/components'
import { LayoutConfig, Layout, Breakpoint } from './types'

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

const Root = ({
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

export default Root
