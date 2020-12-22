/* eslint-disable security/detect-object-injection */
import {
  AppBar,
  AppBarProps,
  IconButton,
  IconButtonProps,
  makeStyles,
  Toolbar,
  ToolbarProps,
  useTheme,
} from '@committed/components'
import { PropTypes } from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import clsx from 'clsx'
import React, { CSSProperties, ReactNode } from 'react'
import { Icons } from './Icons'
import { useLayout } from './Root'

export interface HeaderProps extends AppBarProps {
  /**
   * Add a class name to the component, can be used for additional styling
   */
  className?: string
  /**
   * To add styling to the component
   */
  style?: CSSProperties
  /**
   * Use to supply additional props to the the toolbar component
   * See https://committed.software/components/?path=/docs/components-toolbar--app-bar
   */
  toolbarProps?: ToolbarProps
  /**
   * Use to supply additional props to the the menuButton component
   * See https://committed.software/components/?path=/docs/components-iconbutton--default-story
   */
  menuButtonProps?: Omit<IconButtonProps, 'onClick' | 'color'>
  /**
   * Will replace the default close menu icon
   * @default ChevronLeft
   */
  closeMenuIcon?: ReactNode
  /**
   * Will replace the default open menu icon
   * @default Menu
   */

  openMenuIcon?: ReactNode
  /**
   * The color property for the AppBar
   */
  color?: PropTypes.Color | 'transparent'
  /**
   * Should the menu icon be shown in the
   */
  showMenuIcon?: boolean
  /**
   * Set to elevate the app bar using shadow.
   * Shadow depth, corresponds to dp in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 0
   */
  elevation?: number
  children?: ReactNode
}

const useStyles = makeStyles(({ transitions }) => ({
  root: {
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: -8,
    marginRight: 8,
  },
}))

interface ElevationScrollProps {
  base: number
  children: React.ReactElement
}

const ElevationScroll = ({
  children,
  base,
}: ElevationScrollProps): React.ReactElement => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? Math.min(base + 4, 24) : base,
  })
}

export const Header: React.FC<HeaderProps> = ({
  className = '',
  style = {},
  closeMenuIcon,
  openMenuIcon = <Icons.Menu />,
  color = 'primary',
  toolbarProps = {},
  menuButtonProps = {},
  showMenuIcon = true,
  elevation = 0,
  children,
  ...props
}) => {
  const theme = useTheme()
  const layout = useLayout()
  const classes = useStyles()

  const {
    navWidth,
    navVariant,
    navAnchor,
    headerPosition,
    headerResponse,
    open,
    setOpen,
  } = layout

  closeMenuIcon =
    typeof closeMenuIcon !== 'undefined' || navAnchor === 'left' ? (
      <Icons.ChevronLeft />
    ) : (
      <Icons.ChevronRight />
    )
  const shouldRenderMenu = navVariant !== 'permanent' && showMenuIcon
  const showMenuLeft = shouldRenderMenu && navAnchor === 'left'
  const showMenuRight = shouldRenderMenu && navAnchor === 'right'

  const margin = {
    clipped: 0,
    static: 0,
    squeezed: navWidth,
    pushed: navWidth,
  }[headerResponse]

  const marginLeft = navAnchor === 'left' ? margin : 0
  const marginRight = navAnchor === 'right' ? margin : 0

  const width = {
    clipped: '100%',
    static: '100%',
    squeezed: `calc(100% - ${navWidth}px)`,
    pushed: '100%',
  }[headerResponse]

  const zIndex =
    headerResponse === 'clipped' ? theme.zIndex.drawer + 1 : theme.zIndex.appBar

  const icon = (
    <IconButton
      color="inherit"
      onClick={setOpen}
      className={classes.menuButton}
      aria-label={open ? 'Close' : 'Open'}
      {...menuButtonProps}
    >
      {open ? closeMenuIcon : openMenuIcon ?? closeMenuIcon}
    </IconButton>
  )

  const header = (
    <AppBar
      role="header"
      color={color}
      elevation={elevation}
      className={clsx(className, classes.root)}
      position={headerPosition}
      style={{
        zIndex,
        width,
        marginLeft,
        marginRight,
        ...style,
      }}
      {...props}
    >
      <Toolbar {...toolbarProps}>
        {showMenuLeft ? icon : null}
        {children}
        {showMenuRight ? icon : null}
      </Toolbar>
    </AppBar>
  )

  if (headerPosition === 'sticky') {
    return <ElevationScroll base={elevation}>{header}</ElevationScroll>
  } else {
    return header
  }
}
