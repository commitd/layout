import React, { useContext, ReactNode, CSSProperties } from 'react'
import { PropTypes } from '@material-ui/core'
import {
  AppBar,
  Toolbar,
  IconButton,
  Theme,
  makeStyles,
  useTheme
} from '@material-ui/core'
import { LayoutContext } from './Root'
import { Layout, Position } from './types'

export type HeaderProps = {
  className?: string
  style?: CSSProperties
  position?: Position
  children?: ReactNode
  toolbarProps?: any
  menuButtonProps?: any
  chevronLeftIcon: ReactNode
  menuIcon: ReactNode
  color?: PropTypes.Color
}

const useStyles = makeStyles<Theme>(({ transitions }) => ({
  root: {
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginLeft: -8,
    marginRight: 8
  }
}))

const createGet = (
  {
    clipped,
    navVariant,
    collapsible,
    collapsed,
    open,
    squeezed,
    navAnchor
  }: Layout,
  normal: string | number,
  shrink: string | number,
  pushed: string | number,
  unsqueeze: string | number
) => () => {
  if (clipped || navAnchor !== 'left') return normal
  if (navVariant === 'persistent' && open) {
    // open is effect only when
    // navVariant === 'persistent' ||
    // navVariant === 'temporary'
    if (squeezed) {
      return pushed
    }
    return unsqueeze
  }
  if (navVariant === 'permanent') {
    if (collapsible) {
      if (collapsed) return shrink
      return pushed
    }
    return pushed
  }
  return normal
}

const Header = ({
  className = '',
  chevronLeftIcon,
  menuIcon,
  style = {},
  color = 'primary',
  children,
  toolbarProps = {},
  menuButtonProps = {}
}: HeaderProps) => {
  const theme = useTheme<Theme>()
  const classes = useStyles()
  const ctx = useContext(LayoutContext)
  const {
    clipped,
    collapsedWidth,
    navWidth,
    navVariant,
    headerPosition,
    open,
    setOpen
  } = ctx
  const getWidth = createGet(
    ctx,
    '100%',
    `calc(100% - ${collapsedWidth}px)`,
    `calc(100% - ${navWidth}px)`,
    '100%'
  )
  const getMargin = createGet(ctx, 0, collapsedWidth, navWidth, navWidth)
  const shouldRenderMenu = navVariant !== 'permanent' && !!menuIcon
  return (
    <AppBar
      color={color}
      elevation={0}
      className={`${className} ${classes.root}`}
      position={headerPosition}
      style={{
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        ...style,
        zIndex: clipped ? theme.zIndex.drawer + 1 : theme.zIndex.appBar,
        width: getWidth(),
        marginLeft: getMargin()
      }}
    >
      <Toolbar {...toolbarProps}>
        {shouldRenderMenu && (
          <IconButton
            color="inherit"
            onClick={setOpen}
            className={classes.menuButton}
            {...menuButtonProps}
          >
            {open ? chevronLeftIcon : menuIcon || chevronLeftIcon}
          </IconButton>
        )}
        {typeof children === 'function' ? children(ctx) : children}
      </Toolbar>
    </AppBar>
  )
}

export default Header
