import React, {
  useContext,
  ReactNode,
  ElementType,
  HTMLAttributes,
} from 'react'
import { Theme, makeStyles } from '@material-ui/core'
import { LayoutContext } from './Root'

const useStyles = makeStyles<Theme>(({ transitions }) => ({
  root: {
    flexGrow: 1,
    transition: transitions.create(['margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
}))

export interface ContentProps {
  className?: string
  style?: any
  component?: ElementType<HTMLAttributes<HTMLElement>>
  children?: ReactNode
}

const Content = ({
  className = '',
  component: Component = 'main',
  style = {},
  ...props
}: ContentProps) => {
  const classes = useStyles()
  const ctx = useContext(LayoutContext)
  const {
    navVariant,
    navWidth,
    collapsible,
    collapsed,
    collapsedWidth,
    open,
    navAnchor,
    squeezed,
  } = ctx
  const getMargin = () => {
    if (navAnchor !== 'left') return 0
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
    <Component
      {...props}
      className={`${className} ${classes.root}`}
      style={{
        ...style,
        marginLeft: getMargin(),
        width: getWidth(),
      }}
    />
  )
}

export default Content
