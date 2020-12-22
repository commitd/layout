import { List } from '@committed/components'
import React from 'react'
import { Nav, NavListItem, Root, Header } from '../src'
import { render, renderDark, userEvent } from './setupTests'

const text = 'content'

it('renders Content', () => {
  const { getByText } = render(
    <Root config={{ navAnchor: 'left', navVariant: 'permanent' }}>
      <Nav>
        <List>
          <NavListItem text={text} />
        </List>
      </Nav>
    </Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
})

it('renders Content right/dark', () => {
  const { getByText } = renderDark(
    <Root config={{ navAnchor: 'right', navVariant: 'permanent' }}>
      <Nav>
        <List>
          <NavListItem text={text} />
        </List>
      </Nav>
    </Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
})

it('clicking closes when temporary', () => {
  const onClick = jest.fn()
  const { getByRole, queryByRole } = render(
    <Root config={{ navAnchor: 'right', navVariant: 'temporary' }}>
      <Header />
      <Nav>
        <List>
          <NavListItem onClick={onClick} text={text} />
        </List>
      </Nav>
    </Root>
  )
  const open = getByRole('button', { name: /open/i })
  userEvent.click(open)
  expect(queryByRole('nav')).not.toBeNull()
  const button = getByRole('button', { name: text })
  userEvent.click(button)
  expect(queryByRole('nav')).toBeNull()
})

it('clicking does not close if not closeFor', () => {
  const onClick = jest.fn()
  const { getByRole, queryByRole } = render(
    <Root config={{ navAnchor: 'right', navVariant: 'temporary' }}>
      <Header />
      <Nav>
        <List>
          <NavListItem
            closeFor={['persistent']}
            onClick={onClick}
            text={text}
          />
        </List>
      </Nav>
    </Root>
  )
  const open = getByRole('button', { name: /open/i })
  userEvent.click(open)
  expect(queryByRole('nav')).not.toBeNull()
  const button = getByRole('button', { name: text })
  userEvent.click(button)
  expect(queryByRole('nav')).not.toBeNull()
})
