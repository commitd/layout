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

interface DumbProps {
  marginLeft: number
  marginRight: number
  width: string
}

/*
 * Content with no layout knowledge
 */
export const DumbContent = ({
  component: Component = 'main',
  className,
  style,
  marginLeft,
  marginRight,
  width,
  ...props
}: ContentProps & DumbProps) => {
  const classes = useStyles()
  return (
    <Component
      {...props}
      className={`${className} ${classes.root}`}
      style={{
        marginLeft,
        marginRight,
        width,
        ...style,
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
  const { currentNavWidth, navAnchor, contentResponse } = useLayout()

  const margin = {
    static: 0,
    squeezed: currentNavWidth,
    pushed: currentNavWidth,
  }[contentResponse]

  const marginLeft = navAnchor === 'left' ? margin : 0
  const marginRight = navAnchor === 'right' ? margin : 0

  const width = {
    static: '100%',
    squeezed: `calc(100% - ${currentNavWidth}px)`,
    pushed: '100%',
  }[contentResponse]

  return (
    <DumbContent
      {...props}
      className={className}
      component={component}
      style={style}
      marginLeft={marginLeft}
      marginRight={marginRight}
      width={width}
    />
  )
}
