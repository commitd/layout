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
import { Variant } from './types'

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
   *
   */
  closeFor?: Array<Variant>
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
})

export const DumbNavListItem = ({
  icon,
  text,
  onClick,
  listItemIconProps,
  listItemTextProps,
  ...listItemProps
}: NavListItemProps) => {
  const classes = useStyles()
  return (
    <ListItem button onClick={onClick} {...listItemProps}>
      {icon && <ListItemIcon {...listItemIconProps}>{icon}</ListItemIcon>}
      <ListItemText
        primary={text}
        primaryTypographyProps={{ noWrap: true }}
        className={classes.menuItemText}
        {...listItemTextProps}
      />
    </ListItem>
  )
}

/**
 * This is a ListItem that is aware of the layout.
 * In particular, it will close the navigation panel depending on the nav variant.
 *
 * This is a convenience component, and designed for use inside the Root > Nav > List.
 * If further functionality is required you can use the hook useLayout to achieve similar results.
 * Just call `setOpen(false)` on navigation when you wan tto close the nav..
 */
export const NavListItem = ({
  closeFor = ['temporary'],
  onClick,
  text,
  ...props
}: NavListItemProps) => {
  const { setOpen, collapsed, navVariant } = useLayout()
  var action:
    | undefined
    | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) = undefined
  if (closeFor.includes(navVariant)) {
    action = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setOpen(false)
      if (onClick != null) {
        onClick(e)
      }
    }
  } else {
    action = onClick
  }

  return (
    <DumbNavListItem
      onClick={action}
      title={collapsed ? text : undefined}
      text={text}
      {...props}
    />
  )
}
