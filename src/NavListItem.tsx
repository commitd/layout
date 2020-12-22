import {
  ListItem,
  ListItemIcon,
  ListItemIconProps,
  ListItemText,
  ListItemTextProps,
  makeStyles,
} from '@committed/components'
import React from 'react'
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

/**
 * This is a ListItem that is aware of the layout.
 * In particular, it will close the navigation panel depending on the nav variant.
 *
 * This is a convenience component, and designed for use inside the Root > Nav > List.
 * If further functionality is required you can use the hook useLayout to achieve similar results.
 * Just call `setOpen(false)` on navigation when you wan tto close the nav..
 */
export const NavListItem: React.FC<NavListItemProps> = ({
  closeFor = ['temporary'],
  onClick,
  text,
  icon,
  listItemIconProps,
  listItemTextProps,
  ...props
}: NavListItemProps) => {
  const { setOpen, collapsed, navVariant } = useLayout()
  const classes = useStyles()
  let action:
    | undefined
    | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) = undefined
  if (closeFor.includes(navVariant)) {
    action = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      setOpen(false)
      if (onClick != null) {
        onClick(e)
      }
    }
  } else {
    action = onClick
  }

  return (
    <ListItem
      button
      onClick={action}
      title={collapsed ? text : undefined}
      {...props}
    >
      {typeof icon !== 'undefined' ? (
        <ListItemIcon {...listItemIconProps}>{icon}</ListItemIcon>
      ) : null}
      <ListItemText
        primary={text}
        primaryTypographyProps={{ noWrap: true }}
        className={classes.menuItemText}
        {...listItemTextProps}
      />
    </ListItem>
  )
}
