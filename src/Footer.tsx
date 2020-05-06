import React, {
  useContext,
  ReactNode,
  ElementType,
  HTMLAttributes,
  CSSProperties,
} from 'react'
import { LayoutContext } from './Root'
import { makeStyles } from '@committed/components'

export interface FooterProps {
  className?: string
  component?: ElementType<HTMLAttributes<HTMLElement>>
  style?: CSSProperties
  children?: ReactNode
}

const useStyles = makeStyles(({ palette, transitions }) => ({
  root: {
    borderTop: '1px solid',
    borderColor: palette.grey[200],
    background: palette.primary.main,
    color: palette.grey[50],
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
}))

const Footer = ({
  className = '',
  component: Component = 'footer',
  style = {},
  ...props
}: FooterProps) => {
  const classes = useStyles()
  const ctx = useContext(LayoutContext)
  const {
    navVariant,
    navWidth,
    collapsible,
    collapsed,
    collapsedWidth,
    footerShrink,
    open,
    navAnchor,
  } = ctx
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
      {...props}
      className={`${className} ${classes.root}`}
      style={{
        ...style,
        marginLeft: getMargin(),
      }}
    />
  )
}

export default Footer
