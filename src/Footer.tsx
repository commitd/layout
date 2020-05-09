import React, {
  ReactNode,
  ElementType,
  HTMLAttributes,
  CSSProperties,
} from 'react'
import { useLayout } from './Root'
import { makeStyles, Box } from '@committed/components'

export interface FooterProps {
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
   * The color used in the footer, can be keyed from the palette
   */
  color?: string
  /**
   * The background color used in the footer, can be keyed from the palette
   */
  bgcolor?: string
  children?: ReactNode
}

const useStyles = makeStyles(({ transitions }) => ({
  root: {
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
}))

/**
 * Footer with no layout knowledge
 */
export const DumbFooter = ({
  component: Component = 'footer',
  className,
  color,
  bgcolor,
  style,
  marginLeft,
  ...props
}: FooterProps & { marginLeft: number }) => {
  const classes = useStyles()
  return (
    <Component
      className={`${className} ${classes.root}`}
      style={{
        ...style,
        marginLeft,
      }}
    >
      <Box color={color} bgcolor={bgcolor} {...props} />
    </Component>
  )
}

/**
 * The footer is to be used after the Content and will grow and shrink according to the current state of the Navigation
 */
export const Footer = ({
  className = '',
  component = 'footer',
  color = 'primary.contrastText',
  bgcolor = 'primary.main',
  style = {},
  ...props
}: FooterProps) => {
  const { currentNavWidth, footerShrink, navAnchor } = useLayout()

  const getMargin = () => {
    if (navAnchor !== 'left' || !footerShrink) {
      return 0
    }
    return currentNavWidth
  }

  return (
    <DumbFooter
      {...props}
      className={className}
      component={component}
      color={color}
      bgcolor={bgcolor}
      style={style}
      marginLeft={getMargin()}
    />
  )
}
