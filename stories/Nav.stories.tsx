import React from 'react'
import { Root, Nav, NavListItem } from '../src'
import {
  ThemeProvider,
  Typography,
  Icons,
  List,
  Divider,
} from '@committed/components'

export const Use = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '50vh' }}>
        <Nav>
          <Typography>This is the Nav</Typography>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}

export default {
  title: 'Components|Nav',
  component: Nav,
}

export const CustomIcons = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '50vh' }}>
        <Nav collapseIcon={<Icons.Clear />} expandIcon={<Icons.Forward />}>
          <Typography>This is the Nav</Typography>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}

export const WithContent = () => {
  const list = [
    {
      primaryText: 'My Files',
      icon: <Icons.Folder />,
    },
    {
      primaryText: 'Shared with me',
      icon: <Icons.People />,
    },
    {
      primaryText: 'Starred',
      icon: <Icons.Star />,
    },
    {
      primaryText: 'Recent',
      icon: <Icons.Schedule />,
    },
    {
      primaryText: 'Offline',
      icon: <Icons.OfflinePin />,
    },
    {
      primaryText: 'Uploads',
      icon: <Icons.Publish />,
    },
    {
      primaryText: 'Backups',
      icon: <Icons.Backup />,
    },
    {
      primaryText: 'Trash',
      icon: <Icons.Delete />,
    },
  ]
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '50vh' }}>
        <Nav>
          <List>
            {list.map(({ primaryText, icon }, i) => (
              <NavListItem
                key={primaryText}
                selected={i === 0}
                icon={icon}
                text={primaryText}
              />
            ))}
            <Divider style={{ margin: '12px 0' }} />
            <NavListItem
              icon={<Icons.Settings />}
              text={'Settings & account'}
            />
          </List>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}
