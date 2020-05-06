import React, {
  useContext,
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
  Icons,
  makeStyles,
} from '@committed/components'
import { LayoutContext } from './Root'

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
      backgroundColor: palette.grey[50],
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
      background: palette.common.white,
      boxShadow: shadows[2],
      '@media (hover: none)': {
        backgroundColor: palette.grey[300],
      },
      '&:hover': {
        backgroundColor: '#e5e5e5',
      },
    },
  })
)

export interface NavProps {
  className?: string
  component?: ElementType<HTMLAttributes<HTMLElement>>
  children?: ReactNode
  header?: ReactNode
  closeButtonProps?: any
  collapseIcon: ReactNode
  expandIcon: ReactNode
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
  const ctx = useContext(LayoutContext)
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
  } = ctx
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
          {typeof header === 'function' ? header(ctx) : header}
          <div ref={contentRef} className={classes.content}>
            {typeof children === 'function' ? children(ctx) : children}
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
