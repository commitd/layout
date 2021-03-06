import { makeStyles, useWidth } from '@committed/components'
import clsx from 'clsx'
import React, {
  createContext,
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
  useMemo,
  useState,
} from 'react'
import { presets } from './presets'
import { Layout, LayoutConfig } from './types'
import { createNewContext, LAYOUT_DEFAULTS } from './utils'

export interface RootProps {
  /**
   * Add a class name to the component, can be used for additional styling
   */
  className?: string
  /**
   * To add styling to the component
   */
  style?: CSSProperties
  /**
   * Change the component type used
   * @default div
   */
  component?: ElementType<HTMLAttributes<HTMLElement>>
  /**
   * The configuration of the layout, see Layout Config.
   * When providing a config it is merged on to the default so only changes from the default need to be specified.
   * See LayoutConfig in types.
   */
  config?: Partial<LayoutConfig>
  /**
   * Set true to indicate this layout is contained inside some other element
   * Not normally needed.
   * @default false
   */
  contained?: boolean
  children?: ReactNode
}

const LayoutContext = createContext(LAYOUT_DEFAULTS)

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  fullscreen: {
    height: '100vh',
  },
  contained: {
    position: 'relative',
  },
})

/**
 * The Root component establishes the context for all the layout components.
 * All other layout out must be done inside the Root.
 *
 * Within the root any component can use the `useLayout` hook to respond to layout changes or access the functions to force layout changes.
 *
 * When providing a config it is merged on to the default so only changes from the default need to be specified.
 */
export const Root: React.FC<RootProps> = ({
  className,
  component: Component = 'div',
  config = presets.createDefaultLayout(),
  contained = false,
  children,
  ...props
}: RootProps) => {
  const width = useWidth()
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(false)
  const [dragged, setDragged] = useState(false)
  const [open, setOpen] = useState(false)
  const [overrideNavWidth, setNavWidth] = useState<number | null>(null)

  const value = useMemo(() => {
    return createNewContext(
      collapsed,
      config,
      contained,
      dragged,
      open,
      overrideNavWidth,
      width,
      setCollapsed,
      setDragged,
      setNavWidth,
      setOpen
    )
  }, [config, dragged, width, open, collapsed, contained, overrideNavWidth])

  return (
    <LayoutContext.Provider value={value}>
      <Component
        className={clsx(className, classes.root, {
          [classes.contained]: contained,
          [classes.fullscreen]: !contained,
        })}
        {...props}
      >
        {children}
      </Component>
    </LayoutContext.Provider>
  )
}

export const useLayout = (): Layout => React.useContext(LayoutContext)
