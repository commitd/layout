import React, {
  ReactNode,
  ElementType,
  HTMLAttributes,
  CSSProperties,
} from 'react'
import { makeStyles } from '@committed/components'
import { useLayout } from './Root'

export interface ContentProps {
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
   * @default main
   */
  component?: ElementType<HTMLAttributes<HTMLElement>>
  children?: ReactNode
}

const useStyles = makeStyles(({ transitions }) => ({
  root: {
    flexGrow: 1,
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
}))

/*
 * Content with no layout knowledge
 */
export const DumbContent = ({
  component: Component = 'main',
  className,
  style,
  marginLeft,
  width,
  ...props
}: ContentProps & { marginLeft: number; width: string }) => {
  const classes = useStyles()
  return (
    <Component
      {...props}
      className={`${className} ${classes.root}`}
      style={{
        ...style,
        marginLeft,
        width,
      }}
    />
  )
}

/**
 * To contain the main content of the page.
 *
 * Always visible, grows to fill the vertical space
 */
export const Content = ({
  className = '',
  component = 'main',
  style = {},
  ...props
}: ContentProps) => {
  const { navVariant, currentNavWidth, open, navAnchor, squeezed } = useLayout()
  const getMargin = () => {
    if (navAnchor === 'left' && navVariant !== 'temporary') {
      return currentNavWidth
    } else {
      return 0
    }
  }
  const getWidth = () => {
    if (navVariant === 'persistent' && open) {
      // open is effect only when
      // navVariant === 'persistent' ||
      // navVariant === 'temporary'
      if (squeezed) {
        return 'auto'
      }
      return '100%'
    }
    return 'auto'
  }
  return (
    <DumbContent
      {...props}
      className={className}
      component={component}
      style={style}
      marginLeft={getMargin()}
      width={getWidth()}
    />
  )
}
