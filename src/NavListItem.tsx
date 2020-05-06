import React, { ComponentProps } from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@committed/components'
import { LayoutContext } from './Root'

interface NavListItemProps
  extends Omit<ComponentProps<typeof ListItem>, 'button'> {
  icon: React.ReactElement
  text: string
  listItemIconProps?: ComponentProps<typeof ListItemIcon>
  listItemTextProps?: ComponentProps<typeof ListItemText>
}

const useStyles = makeStyles({
  menuItemText: {
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
})

export const NavListItem: React.FC<NavListItemProps> = ({
  icon,
  text,
  onClick,
  listItemIconProps,
  listItemTextProps,
  ...listItemProps
}) => {
  const classes = useStyles()
  const { setOpen } = React.useContext(LayoutContext)
  return (
    <ListItem
      button
      onClick={(e) => {
        setOpen(false)
        if (onClick != null) {
          onClick(e)
        }
      }}
      {...listItemProps}
    >
      <ListItemIcon {...listItemIconProps}>{icon}</ListItemIcon>
      <ListItemText
        primary={text}
        className={classes.menuItemText}
        {...listItemTextProps}
      />
    </ListItem>
  )
}
