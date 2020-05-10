import React from 'react'
import { Root, Header, Nav, NavListItem } from '../src'
import { ThemeProvider, Icons, List } from '@committed/components'

export const Use = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '50vh' }}>
        <Nav>
          <List>
            <NavListItem icon={<Icons.People />} text="Shared with me" />
          </List>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}

export default {
  title: 'Components|NavListItem',
  component: NavListItem,
}

export const Selected = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '50vh' }}>
        <Nav>
          <List>
            <NavListItem icon={<Icons.People />} text="Selected" selected />
            <NavListItem icon={<Icons.People />} text="Unselected" />
          </List>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}

export const CloseTemporary = () => {
  return (
    <ThemeProvider>
      <Root
        fullscreen={false}
        style={{ minHeight: '50vh' }}
        config={{ navVariant: 'temporary' }}
      >
        <Header />
        <Nav>
          <List>
            <NavListItem icon={<Icons.People />} text="Selected" selected />
            <NavListItem icon={<Icons.People />} text="Unselected" />
          </List>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}

export const ClosePersistent = () => {
  return (
    <ThemeProvider>
      <Root
        fullscreen={false}
        style={{ minHeight: '50vh' }}
        config={{ navVariant: 'persistent' }}
      >
        <Header />
        <Nav>
          <List>
            <NavListItem
              closeFor={['persistent']}
              icon={<Icons.People />}
              text="Selected"
              selected
            />
            <NavListItem
              closeFor={['persistent']}
              icon={<Icons.People />}
              text="Unselected"
            />
          </List>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}

export const LeavePersistent = () => {
  return (
    <ThemeProvider>
      <Root
        fullscreen={false}
        style={{ minHeight: '50vh' }}
        config={{ navVariant: 'persistent' }}
      >
        <Header />
        <Nav>
          <List>
            <NavListItem icon={<Icons.People />} text="Selected" selected />
            <NavListItem icon={<Icons.People />} text="Unselected" />
          </List>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}

export const NoIcon = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '50vh' }}>
        <Nav>
          <List>
            <NavListItem text="No icon" />
          </List>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}
