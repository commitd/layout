import {
  Button,
  Drawer,
  DrawerProps,
  Grow,
  IconButton,
  IconButtonProps,
  makeStyles,
  Toolbar,
} from '@committed/components'
import clsx from 'clsx'
import React, {
  ElementType,
  Fragment,
  HTMLAttributes,
  ReactNode,
  useRef,
} from 'react'
import { Icons } from './Icons'
import { useLayout } from './Root'

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
    containerLeft: {
      paddingRight: '5px',
    },
    containerRight: {
      paddingLeft: '5px',
    },
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
    dragger: {
      width: '5px',
      cursor: 'ew-resize',
      padding: '4px 0 0',
      borderTop: '1px solid #ddd',
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 100,
      backgroundColor: palette.action.selected,
    },
    draggerLeft: {
      right: 0,
    },
    draggerRight: {
      left: 0,
    },
  })
)

export const Nav: React.FC<NavProps> = ({
  className = '',
  component: Component = 'div',
  closeButtonProps = {},
  expandIcon,
  collapseIcon,
  header = null,
  children,
  ...props
}: NavProps) => {
  const {
    open,
    contained,
    draggable: canDrag,
    dragged,
    setOpen,
    headerResponse,
    navVariant,
    navAnchor,
    collapsible,
    collapsed,
    setCollapsed,
    navWidth,
    setNavWidth,
    setDragged,
  } = useLayout()
  const classes = useStyles()
  const contentRef = useRef(null)

  const showCollapseButton = collapsible
  const clipped = headerResponse === 'clipped'

  const drawerClasses = clsx(className, collapsed && classes.collapsed)
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

  const handleMouseMove = React.useCallback(
    (e: MouseEvent): void => {
      e.preventDefault()
      setNavWidth(e.clientX)
    },
    [setNavWidth]
  )

  const handleMouseUp = (): void => {
    setDragged(false)
    document.removeEventListener('mouseup', handleMouseUp, true)
    document.removeEventListener('mousemove', handleMouseMove, true)
  }

  const handleMouseDown = (): void => {
    setDragged(true)
    document.addEventListener('mouseup', handleMouseUp, true)
    document.addEventListener('mousemove', handleMouseMove, true)
  }

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
        {canDrag && !collapsed ? (
          <div
            key="dragger"
            role="button"
            draggable="true"
            aria-label="drag-handle"
            aria-grabbed={dragged}
            onMouseDown={handleMouseDown}
            className={clsx(
              classes.dragger,
              navAnchor === 'left' ? classes.draggerLeft : classes.draggerRight
            )}
          />
        ) : null}
        {/* Just for spacing */}
        {clipped && navVariant !== 'temporary' ? <Toolbar /> : null}
        <Component
          role="nav"
          className={clsx(
            classes.container,
            canDrag
              ? navAnchor === 'left'
                ? classes.containerLeft
                : classes.containerRight
              : undefined
          )}
          style={{ width: navWidth }}
        >
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
            navAnchor === 'left'
              ? { left: navWidth + 16 }
              : { right: navWidth + 16 }
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
