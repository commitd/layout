import React, {
  useRef,
  ReactNode,
  ElementType,
  HTMLAttributes,
  Fragment,
} from 'react'
import {
  Grow,
  Drawer,
  DrawerProps,
  Button,
  IconButton,
  IconButtonProps,
  makeStyles,
  Toolbar,
} from '@committed/components'
import { Icons } from './Icons'
import { Layout } from './types'
import { useLayout } from './Root'
import clsx from 'clsx'

export interface NavProps extends DrawerProps {
  /**
   * Add a class name to the component, can be used for additional styling
   */
  className?: string
  /**
   * Change the component type used (nested in the draw)
   * @default div
   */
  component?: ElementType<HTMLAttributes<HTMLElement>>
  /**
   * Supply optional navigation header
   */
  header?: ReactNode
  /**
   * Supply additional close button props
   */
  closeButtonProps?: IconButtonProps
  /**
   * Supply a different  collapse icon
   */
  collapseIcon?: ReactNode
  /**
   * Supply a different expand icon
   */
  expandIcon?: ReactNode
  children?: ReactNode
}

const useStyles = makeStyles(
  ({ breakpoints, transitions, palette, spacing, zIndex, shadows }) => ({
    root: {},
    container: {
      overflow: 'hidden',
      display: 'flex',
      flexGrow: 1,
      flexShrink: 0,
      flexDirection: 'column',
      transition: transitions.create(['width'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
    },
    collapsed: {
      overflowX: 'hidden',
    },
    contained: {
      position: 'absolute',
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
    },
    contentCollapsed: {
      flexGrow: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    collapseButton: {
      backgroundColor: palette.background.paper,
      color: palette.text.primary,
      textAlign: 'center',
      borderRadius: 0,
      borderTop: '1px solid',
      borderColor: 'rgba(0,0,0,0.12)',
      [breakpoints.up('sm')]: {
        minHeight: 40,
      },
    },
    closeButton: {
      position: 'absolute',
      bottom: spacing(2),
      zIndex: zIndex.modal + 1,
      background: palette.background.paper,
      boxShadow: shadows[3],
      '@media (hover: none)': {
        backgroundColor: palette.background.paper,
      },
      '&:hover': {
        backgroundColor: palette.background.paper,
      },
    },
  })
)

interface DumbProps
  extends Pick<
    Layout,
    | 'open'
    | 'setOpen'
    | 'navVariant'
    | 'navAnchor'
    | 'setCollapsed'
    | 'collapsed'
    | 'contained'
  > {
  clipped: boolean
  showCollapseButton: boolean
  width: number
}

export const DumbNav: React.FC<NavProps & DumbProps> = ({
  component: Component = 'div',
  contained = false,
  className,
  header = null,
  collapseIcon,
  expandIcon,
  closeButtonProps,
  showCollapseButton,
  open,
  setOpen,
  navVariant,
  navAnchor,
  collapsed,
  setCollapsed,
  clipped,
  width,
  children,
  ...props
}: NavProps & DumbProps) => {
  const classes = useStyles()
  const contentRef = useRef(null)
  const drawerClasses = clsx(
    className,
    classes.root,
    collapsed && classes.collapsed
  )
  const contentClasses = collapsed ? classes.contentCollapsed : classes.content
  const paperClasses = clsx(contained && classes.contained)

  collapseIcon =
    typeof collapseIcon !== 'undefined' || navAnchor === 'left' ? (
      <Icons.ChevronLeft />
    ) : (
      <Icons.ChevronRight />
    )
  expandIcon =
    typeof expandIcon !== 'undefined' || navAnchor === 'left' ? (
      <Icons.ChevronRight />
    ) : (
      <Icons.ChevronLeft />
    )

  return (
    <Fragment>
      <Drawer
        {...props}
        className={drawerClasses}
        open={open}
        onClose={setOpen}
        variant={navVariant}
        anchor={navAnchor}
        classes={{ paper: paperClasses }}
      >
        {/* Just for spacing */}
        {clipped && navVariant !== 'temporary' ? <Toolbar /> : null}
        <Component className={classes.container} style={{ width }}>
          {header}
          <div ref={contentRef} className={contentClasses}>
            {children}
          </div>
          {showCollapseButton ? (
            <Button
              className={classes.collapseButton}
              fullWidth
              onClick={setCollapsed}
              title={collapsed ? 'Expand' : 'Collapse'}
              aria-label={collapsed ? 'Expand' : 'Collapse'}
            >
              {collapsed ? expandIcon : collapseIcon}
            </Button>
          ) : null}
        </Component>
      </Drawer>
      <Grow in={open && navVariant === 'temporary'}>
        <IconButton
          className={classes.closeButton}
          style={
            navAnchor === 'left' ? { left: width + 16 } : { right: width + 16 }
          }
          onClick={setOpen}
          title={open ? 'Close' : 'Open'}
          aria-label={open ? 'Close' : 'Open'}
          {...closeButtonProps}
        >
          {collapseIcon}
        </IconButton>
      </Grow>
    </Fragment>
  )
}

export const Nav: React.FC<NavProps> = ({
  className = '',
  component = 'div',
  closeButtonProps = {},
  ...props
}) => {
  const {
    open,
    contained,
    setOpen,
    headerResponse,
    navVariant,
    navAnchor,
    collapsible,
    collapsed,
    setCollapsed,
    currentNavWidth,
  } = useLayout()
  const showCollapseButton = collapsible
  const clipped = headerResponse === 'clipped'
  return (
    <DumbNav
      component={component}
      contained={contained}
      className={className}
      closeButtonProps={closeButtonProps}
      showCollapseButton={showCollapseButton}
      open={open}
      setOpen={setOpen}
      clipped={clipped}
      navVariant={navVariant}
      navAnchor={navAnchor}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      width={currentNavWidth}
      {...props}
    />
  )
}
