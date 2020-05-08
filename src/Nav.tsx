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
} from '@committed/components'
import { useLayout } from './Root'

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
    content: {
      flexGrow: 1,
      overflow: 'auto',
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

export const Nav = ({
  className = '',
  component: Component = 'div',
  header = null,
  collapseIcon = <Icons.ChevronLeft />,
  expandIcon = <Icons.ChevronRight />,
  children,
  closeButtonProps = {},
  ...props
}: NavProps) => {
  const classes = useStyles()
  const {
    open,
    setOpen,
    navVariant,
    navAnchor,
    navWidth,
    collapsedWidth,
    collapsible,
    collapsed,
    setCollapsed,
  } = useLayout()
  const getWidth = () => {
    if (collapsible && collapsed) return collapsedWidth
    return navWidth
  }
  const shouldRenderButton = collapsible
  const contentRef = useRef(null)
  return (
    <Fragment>
      <Drawer
        {...props}
        className={`${className} ${classes.root}`}
        open={open}
        onClose={setOpen}
        variant={navVariant}
        anchor={navAnchor}
      >
        <Component className={classes.container} style={{ width: getWidth() }}>
          {header}
          <div ref={contentRef} className={classes.content}>
            {children}
          </div>
          {shouldRenderButton && (
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
          style={{ left: navWidth + 16 }}
          onClick={setOpen}
          {...closeButtonProps}
        >
          {collapseIcon}
        </IconButton>
      </Grow>
    </Fragment>
  )
}
