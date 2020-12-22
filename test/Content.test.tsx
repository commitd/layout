import React from 'react'
import { Root, Content } from '../src'
import { render, renderDark } from './setupTests'

const text = 'content'

it('renders Content', () => {
  const { getByText } = render(
    <Root>
      <Content>{text}</Content>
    </Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
})

it('renders Content right/dark', () => {
  const { getByText } = renderDark(
    <Root config={{ navAnchor: 'right' }}>
      <Content>{text}</Content>
    </Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
})

it('renders with given style', () => {
  const { getByText, container } = render(
    <Root>
      <Content style={{ padding: '10px' }}>{text}</Content>
    </Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
  expect(container).toContainHTML('padding: 10px')
})

it('Adds class name', () => {
  const className = 'test'
  const { getByText, container } = render(
    <Root>
      <Content className={className}>{text}</Content>
    </Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
  expect(container.querySelector(`.${className}`)).toBeInTheDocument()
})

it('Can change component', () => {
  const { getByText, container } = render(
    <Root>
      <Content component="article">{text}</Content>
    </Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
  expect(container).toContainHTML('<article')
})

it('Adds spacer for `fixed`', () => {
  const { getByText, container } = render(
    <Root config={{ headerPosition: 'fixed' }}>
      <Content component="article">{text}</Content>
    </Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
  expect(container.querySelector(`.MuiToolbar-root`)).toBeInTheDocument()
})

it('renders with role', () => {
  const { getByRole } = render(
    <Root>
      <Content>{text}</Content>
    </Root>
  )
  getByRole('main')
})
