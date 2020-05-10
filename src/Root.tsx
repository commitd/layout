import React, {
  useState,
  useMemo,
  CSSProperties,
  createContext,
  HTMLAttributes,
  ReactNode,
  ElementType,
} from 'react'
import { useWidth, makeStyles } from '@committed/components'
import { LayoutConfig } from './types'
import { defaultContext, createNewContext, getNavWidth } from './utils'
import { presets } from './presets'

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
   * @default footer
   */
  component?: ElementType<HTMLAttributes<HTMLElement>>
  /**
   * The configuration of the layout, see Layout Config.
   * When providing a config it is merged on to the default so only changes from the default need to be specified.
   * See LayoutConfig in types.
   */
  config?: Partial<LayoutConfig>
  children?: ReactNode
}

const LayoutContext = createContext(defaultContext)

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
export const Root = ({
  className = '',
  component = 'div',
  config = presets.createDefaultLayout(),
  children,
  ...props
}: RootProps) => {
  const Component = component
  const width = useWidth()
  const classes = useStyles()
  const [collapsed, setCollapsed] = useState(false)
  const [open, setOpen] = useState(false)

  const value = useMemo(() => {
    const layout = createNewContext(
      config,
      width,
      open,
      collapsed,
      setOpen,
      setCollapsed
    )
    const currentNavWidth = getNavWidth(layout)
    return { currentNavWidth, ...layout }
  }, [config, width, open, collapsed])

  return (
    <LayoutContext.Provider value={value}>
      <Component className={`${className} ${classes.root}`} {...props}>
        {children}
      </Component>
    </LayoutContext.Provider>
  )
}

export const useLayout = () => React.useContext(LayoutContext)
