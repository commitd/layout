import React from 'react'
import { Root, Footer } from '../src'
import { render, renderDark } from './setupTests'

const text = 'Footer'

it('renders Footer', () => {
  const { getByText } = render(
    <Root>
      <Footer>{text}</Footer>
    </Root>
  )
  const footer = getByText(text)
  expect(footer).toBeInTheDocument()
})

it('renders Footer right/dark', () => {
  const { getByText } = renderDark(
    <Root config={{ navAnchor: 'right' }}>
      <Footer>{text}</Footer>
    </Root>
  )
  const footer = getByText(text)
  expect(footer).toBeInTheDocument()
})

it('renders with given style', () => {
  const { getByText, container } = render(
    <Root>
      <Footer style={{ padding: '10px' }}>{text}</Footer>
    </Root>
  )
  const footer = getByText(text)
  expect(footer).toBeInTheDocument()
  expect(container).toContainHTML('padding: 10px')
})

it('Adds class name', () => {
  const className = 'test'
  const { getByText, container } = render(
    <Root>
      <Footer className={className}>{text}</Footer>
    </Root>
  )
  const footer = getByText(text)
  expect(footer).toBeInTheDocument()
  expect(container.querySelector(`.${className}`)).toBeInTheDocument()
})

it('Adds colors', () => {
  const className = 'test'
  const { getByText, container } = render(
    <Root>
      <Footer color="secondary.main" bgcolor="black" className={className}>
        {text}
      </Footer>
    </Root>
  )
  const footer = getByText(text)
  expect(footer).toBeInTheDocument()
  expect(container).toContainHTML('Styled(MuiBox)-root')
})

it('renders with role', () => {
  const { getByRole } = render(
    <Root>
      <Footer>{text}</Footer>
    </Root>
  )
  getByRole('footer')
})
