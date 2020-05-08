import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  ListItemIconProps,
  ListItemTextProps,
} from '@committed/components'
import { useLayout } from './Root'

export interface NavListItemProps
  extends Omit<React.ComponentProps<typeof ListItem>, 'button' | 'onClick'> {
  /**
   * The icon to display
   */
  icon?: React.ReactElement
  /**
   * The text to display
   */
  text: string
  /**
   * additional props for list item icon
   */
  listItemIconProps?: ListItemIconProps
  /**
   * additional props for list item text
   */
  listItemTextProps?: ListItemTextProps
  /**
   * action to perform on click, in addition to closing the temporary menu
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>
  /**
   * To mark as selected
   */
  selected?: boolean
}

const useStyles = makeStyles({
  menuItemText: {
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  collapsedSize: {
    minWidth: '32px',
    minHeight: '32px',
    alignItems: 'center',
  },
})

/**
 * This is a ListItem that is aware of the layout.
 * In particular, it will close the navigation panel when in the temporary nav variant.
 *
 * This is a convenience component, and designed for use inside the Root > Nav > List.
 * If further functionality is required you can use the hook useLayout to achieve similar results.
 * Just call `setOpen(false)` on navigation, it is safe to do even if not in `temporary` mode.
 */
export const NavListItem = ({
  icon,
  text,
  onClick,
  listItemIconProps,
  listItemTextProps,
  ...listItemProps
}: NavListItemProps) => {
  const classes = useStyles()
  const { setOpen, collapsed, collapsedWidth } = useLayout()
  return (
    <ListItem
      button
      onClick={(e) => {
        setOpen(false)
        if (onClick != null) {
          onClick(e)
        }
      }}
      style={collapsed ? { width: collapsedWidth } : undefined}
      title={collapsed ? text : undefined}
      {...listItemProps}
    >
      {icon && (
        <ListItemIcon
          className={collapsed ? classes.collapsedSize : undefined}
          {...listItemIconProps}
        >
          {icon}
        </ListItemIcon>
      )}
      {collapsed && icon ? null : (
        <ListItemText
          primary={text}
          primaryTypographyProps={{ noWrap: true }}
          className={classes.menuItemText}
          {...listItemTextProps}
        />
      )}
    </ListItem>
  )
}
