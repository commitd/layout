import React from 'react'
import { Root, Header, Position } from '../src'
import { render, renderDark, userEvent } from './setupTests'

const text = 'Header'

it('renders Header', () => {
  const { getByText } = render(
    <Root>
      <Header>{text}</Header>
    </Root>
  )
  const header = getByText(text)
  expect(header).toBeInTheDocument()
})

it('renders Header right/dark', () => {
  const { getByText } = renderDark(
    <Root config={{ navAnchor: 'right' }}>
      <Header>{text}</Header>
    </Root>
  )
  const header = getByText(text)
  expect(header).toBeInTheDocument()
})

it('renders with given style', () => {
  const { getByText, container } = render(
    <Root>
      <Header style={{ padding: '10px' }}>{text}</Header>
    </Root>
  )
  const header = getByText(text)
  expect(header).toBeInTheDocument()
  expect(container).toContainHTML('padding: 10px')
})

it('Adds class name', () => {
  const className = 'test'
  const { getByText, container } = render(
    <Root>
      <Header className={className}>{text}</Header>
    </Root>
  )
  const header = getByText(text)
  expect(header).toBeInTheDocument()
  expect(container.querySelector(`.${className}`)).toBeInTheDocument()
})

it('Adds colors', () => {
  const className = 'test'
  const { getByText, container } = render(
    <Root>
      <Header color="secondary" className={className}>
        {text}
      </Header>
    </Root>
  )
  const header = getByText(text)
  expect(header).toBeInTheDocument()
  expect(container).toContainHTML('MuiAppBar-colorSecondary')
})

const positions: Array<Array<Position>> = [
  ['static'],
  ['relative'],
  ['sticky'],
  ['fixed'],
  ['absolute'],
]

test.each(positions)('renders Header for variant %s', (position) => {
  const { getByText } = renderDark(
    <Root config={{ headerPosition: position }}>
      <Header>{text}</Header>
    </Root>
  )
  const header = getByText(text)
  expect(header).toBeInTheDocument()
})

it('renders open button if closed', () => {
  const { getByRole } = render(
    <Root config={{ navVariant: 'temporary' }}>
      <Header>{text}</Header>
    </Root>
  )
  getByRole('button', { name: /open/i })
})

it('renders close button if open', () => {
  const { getByRole } = render(
    <Root config={{ navVariant: 'temporary' }}>
      <Header>{text}</Header>
    </Root>
  )
  const open = getByRole('button', { name: /open/i })
  userEvent.click(open)
  getByRole('button', { name: /close/i })
})

it('renders with role', () => {
  const { getByRole } = render(
    <Root>
      <Header>{text}</Header>
    </Root>
  )
  getByRole('header')
})
