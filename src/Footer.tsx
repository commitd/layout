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
 * The footer is to be used after the Content and will grow and shrink according to the current state of the Navigation
 */
export const Footer = ({
  className = '',
  component: Component = 'footer',
  color = 'primary.contrastText',
  bgcolor = 'primary.main',
  style = {},
  ...props
}: FooterProps) => {
  const classes = useStyles()
  const {
    navVariant,
    navWidth,
    collapsible,
    collapsed,
    collapsedWidth,
    footerShrink,
    open,
    navAnchor,
  } = useLayout()
  const getMargin = () => {
    if (navAnchor !== 'left' || !footerShrink) return 0
    if (navVariant === 'persistent' && open) {
      // open is effect only when
      // navVariant === 'persistent' ||
      // navVariant === 'temporary'
      return navWidth
    }
    if (navVariant === 'permanent') {
      if (collapsible) {
        if (collapsed) return collapsedWidth
        return navWidth
      }
      return navWidth
    }
    return 0
  }
  return (
    <Component
      className={`${className} ${classes.root}`}
      style={{
        ...style,
        marginLeft: getMargin(),
      }}
    >
      <Box color={color} bgcolor={bgcolor} {...props} />
    </Component>
  )
}
