import React from 'react'
import { Root, Nav, NavListItem } from '../src'
import { ThemeProvider, Icons, List } from '@committed/components'

export const Use = () => {
  return (
    <ThemeProvider>
      <Root style={{ minHeight: '50vh' }} config={{}}>
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
      <Root style={{ minHeight: '50vh' }} config={{}}>
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
      <Root style={{ minHeight: '50vh' }} config={{}}>
        <Nav>
          <List>
            <NavListItem text="No icon" />
          </List>
        </Nav>
      </Root>
    </ThemeProvider>
  )
}
