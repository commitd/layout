/* eslint-disable security/detect-object-injection */
import { makeStyles, Toolbar } from '@committed/components'
import clsx from 'clsx'
import React, {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from 'react'
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

const useStyles = makeStyles(({ transitions, palette }) => ({
  root: {
    flexGrow: 1,
    backgroundColor: palette.background.default,
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
}))

/**
 * To contain the main content of the page.
 *
 * Always visible, grows to fill the vertical space
 */
export const Content: React.FC<ContentProps> = ({
  className,
  component: Component = 'main',
  style = {},
  children,
  ...props
}: ContentProps) => {
  const { navWidth, navAnchor, contentResponse, headerPosition } = useLayout()
  const classes = useStyles()

  const addSpacer = ['fixed', 'absolute'].includes(headerPosition)
  const margin = {
    static: 0,
    squeezed: navWidth,
    pushed: navWidth,
  }[contentResponse]

  const marginLeft = navAnchor === 'left' ? margin : 0
  const marginRight = navAnchor === 'right' ? margin : 0

  const width = {
    static: '100%',
    squeezed: `calc(100% - ${navWidth}px)`,
    pushed: '100%',
  }[contentResponse]

  return (
    <Component
      {...props}
      role="main"
      className={clsx(className, classes.root)}
      style={{
        marginLeft,
        marginRight,
        width,
        ...style,
      }}
    >
      {/* Just for spacing */}
      {addSpacer ? <Toolbar /> : null}
      {children}
    </Component>
  )
}
