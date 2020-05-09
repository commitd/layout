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
  Button,
  IconButton,
  IconButtonProps,
  Icons,
  makeStyles,
  Toolbar,
} from '@committed/components'
import { Layout } from './types'
import { useLayout } from './Root'

export interface NavProps {
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
      flexDirection: 'column',
      transition: transitions.create(['width'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
    },
    collapsed: {
      overflowX: 'hidden',
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
    | 'clipped'
  > {
  showCollapseButton: boolean
  width: number
}

export const DumbNav = ({
  component: Component = 'div',
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
  const drawerClasses = `${className} ${classes.root} ${
    collapsed ? classes.collapsed : ''
  }`
  const contentClasses = collapsed ? classes.contentCollapsed : classes.content

  collapseIcon =
    collapseIcon || navAnchor === 'left' ? (
      <Icons.ChevronLeft />
    ) : (
      <Icons.ChevronRight />
    )
  expandIcon =
    expandIcon || navAnchor === 'left' ? (
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
      >
        {/* Just for spacing */}
        {clipped && navVariant !== 'temporary' ? <Toolbar /> : null}
        <Component className={classes.container} style={{ width }}>
          {header}
          <div ref={contentRef} className={contentClasses}>
            {children}
          </div>
          {showCollapseButton && (
            <Button
              className={classes.collapseButton}
              fullWidth
              onClick={setCollapsed}
            >
              {collapsed ? expandIcon : collapseIcon}
            </Button>
          )}
        </Component>
      </Drawer>
      <Grow in={open && navVariant === 'temporary'}>
        <IconButton
          className={classes.closeButton}
          style={
            navAnchor === 'left' ? { left: width + 16 } : { right: width + 16 }
          }
          onClick={setOpen}
          {...closeButtonProps}
        >
          {collapseIcon}
        </IconButton>
      </Grow>
    </Fragment>
  )
}

export const Nav = ({
  className = '',
  component = 'div',
  closeButtonProps = {},
  ...props
}: NavProps) => {
  const {
    open,
    setOpen,
    clipped,
    navVariant,
    navAnchor,
    collapsible,
    collapsed,
    setCollapsed,
    currentNavWidth,
  } = useLayout()
  const showCollapseButton = collapsible
  return (
    <DumbNav
      component={component}
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
