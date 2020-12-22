import React from 'react'
import { Root } from '../src'
import { render, renderDark } from './setupTests'

const text = 'content'

it('renders Content', () => {
  const { getByText } = render(<Root>{text}</Root>)
  const content = getByText(text)
  expect(content).toBeInTheDocument()
})

it('renders Content right/dark', () => {
  const { getByText } = renderDark(
    <Root config={{ navAnchor: 'right' }}>{text}</Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
})

it('renders with given style', () => {
  const { getByText, container } = render(
    <Root style={{ padding: '10px' }}>{text}</Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
  expect(container).toContainHTML('padding: 10px')
})

it('Adds class name', () => {
  const className = 'test'
  const { getByText, container } = render(
    <Root className={className}>{text}</Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
  expect(container.querySelector(`.${className}`)).toBeInTheDocument()
})

it('Can change component', () => {
  const { getByText, container } = render(
    <Root component="article">{text}</Root>
  )
  const content = getByText(text)
  expect(content).toBeInTheDocument()
  expect(container).toContainHTML('<article')
})
