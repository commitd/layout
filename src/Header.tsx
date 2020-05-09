import React, { ReactNode, CSSProperties } from 'react'
import { PropTypes } from '@material-ui/core'
import {
  AppBar,
  Toolbar,
  IconButton,
  Icons,
  makeStyles,
  useTheme,
  ToolbarProps,
  IconButtonProps,
} from '@committed/components'
import { useLayout } from './Root'
import { Layout, Position } from './types'

export interface HeaderProps {
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

interface DumbProps extends Pick<Layout, 'open' | 'setOpen'> {
  zIndex: number
  headerPosition: Position
  width: string
  marginLeft: number
  shouldRenderMenu: boolean
}

export const DumbHeader = ({
  className,
  style,
  closeMenuIcon,
  openMenuIcon,
  color,
  children,
  toolbarProps,
  menuButtonProps,
  zIndex,
  headerPosition,
  width,
  marginLeft,
  open,
  setOpen,
  shouldRenderMenu,
}: HeaderProps & DumbProps) => {
  const classes = useStyles()

  return (
    <AppBar
      color={color}
      elevation={0}
      className={`${className} ${classes.root}`}
      position={headerPosition}
      style={{
        ...style,
        zIndex,
        width,
        marginLeft,
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
            {open ? closeMenuIcon : openMenuIcon || closeMenuIcon}
          </IconButton>
        )}
        {children}
      </Toolbar>
    </AppBar>
  )
}

function selectState<T extends string | number>(
  { clipped, squeezed, navAnchor }: Layout,
  normal: T,
  shrink: T
) {
  if (clipped || navAnchor !== 'left' || !squeezed) {
    return normal
  } else {
    return shrink
  }
}

export const Header = ({
  className = '',
  style = {},
  closeMenuIcon = <Icons.ChevronLeft />,
  openMenuIcon = <Icons.Menu />,
  color = 'primary',
  children,
  toolbarProps = {},
  menuButtonProps = {},
}: HeaderProps) => {
  const theme = useTheme()
  const ctx = useLayout()
  const {
    clipped,
    currentNavWidth,
    navVariant,
    headerPosition,
    open,
    setOpen,
  } = ctx
  const width = selectState<string>(
    ctx,
    '100%',
    `calc(100% - ${currentNavWidth}px)`
  )
  const marginLeft = selectState<number>(ctx, 0, currentNavWidth)
  const shouldRenderMenu = navVariant !== 'permanent' && !!closeMenuIcon
  return (
    <DumbHeader
      className={className}
      style={style}
      closeMenuIcon={closeMenuIcon}
      openMenuIcon={openMenuIcon}
      color={color}
      children={children}
      toolbarProps={toolbarProps}
      menuButtonProps={menuButtonProps}
      zIndex={clipped ? theme.zIndex.drawer + 1 : theme.zIndex.appBar}
      headerPosition={headerPosition}
      width={width}
      marginLeft={marginLeft}
      open={open}
      setOpen={setOpen}
      shouldRenderMenu={shouldRenderMenu}
    />
  )
}
