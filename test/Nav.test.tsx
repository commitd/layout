import React from 'react'
import { act } from 'react-dom/test-utils'
import { Root, Nav, useLayout } from '../src'
import { render, renderDark, userEvent, fireEvent } from './setupTests'

const text = 'Nav'

it('renders Nav', () => {
  const { getByText } = render(
    <Root config={{ navVariant: 'permanent' }}>
      <Nav>{text}</Nav>
    </Root>
  )
  const nav = getByText(text)
  expect(nav).toBeInTheDocument()
})

it('renders Nav right/dark', () => {
  const { getByText } = renderDark(
    <Root config={{ navVariant: 'permanent', navAnchor: 'right' }}>
      <Nav>{text}</Nav>
    </Root>
  )
  const nav = getByText(text)
  expect(nav).toBeInTheDocument()
})

it('renders with given style', () => {
  const { getByText, container } = render(
    <Root config={{ navVariant: 'permanent' }}>
      <Nav style={{ padding: '10px' }}>{text}</Nav>
    </Root>
  )
  const nav = getByText(text)
  expect(nav).toBeInTheDocument()
  expect(container).toContainHTML('padding: 10px')
})

it('Adds class name', () => {
  const className = 'test'
  const { getByText, container } = render(
    <Root config={{ navVariant: 'permanent' }}>
      <Nav className={className}>{text}</Nav>
    </Root>
  )
  const nav = getByText(text)
  expect(nav).toBeInTheDocument()
  expect(container.querySelector(`.${className}`)).toBeInTheDocument()
})

it('renders collapse button if collapsible', () => {
  const { getByRole } = render(
    <Root config={{ navVariant: 'permanent' }}>
      <Nav>{text}</Nav>
    </Root>
  )
  getByRole('button', { name: /collapse/i })
})

it('renders close button if open', () => {
  const { getByRole } = render(
    <Root config={{ navVariant: 'permanent' }}>
      <Nav>{text}</Nav>
    </Root>
  )
  const collapseButton = getByRole('button', { name: /collapse/i })
  userEvent.click(collapseButton)
  getByRole('button', { name: /expand/i })
})

it('renders no collapse button if not collapsible', () => {
  const { queryByRole } = render(
    <Root config={{ navVariant: 'permanent', collapsible: false }}>
      <Nav>{text}</Nav>
    </Root>
  )
  expect(queryByRole('button', { name: /collapse/i })).toBeNull()
})

it('renders draggable button if draggable', () => {
  const { getByRole } = render(
    <Root config={{ navVariant: 'permanent', draggable: true }}>
      <Nav>{text}</Nav>
    </Root>
  )
  getByRole('button', { name: /drag/i })
})

it('renders with role', () => {
  const { getByRole } = render(
    <Root config={{ navVariant: 'permanent' }}>
      <Nav>{text}</Nav>
    </Root>
  )
  getByRole('nav')
})

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

async function drag(element: HTMLElement) {
  const current = {
    clientX: 100,
    clientY: 100,
  }

  fireEvent.mouseEnter(element, current)
  fireEvent.mouseOver(element, current)
  fireEvent.mouseMove(element, current)
  fireEvent.mouseDown(element, current)
  for (let i = 0; i < 20; i++) {
    current.clientX += 10
    await sleep(10)
    fireEvent.mouseMove(element, current)
  }
  fireEvent.mouseUp(element, current)
}

const NavWidth = () => {
  const { navWidth } = useLayout()
  return <div data-testid="test">{navWidth}</div>
}

it('can drag the nav', async () => {
  const startNavWidth = 100
  const addEventListener = jest.spyOn(document, 'addEventListener')
  const removeEventListener = jest.spyOn(document, 'removeEventListener')
  const { getByRole, getByTestId } = render(
    <Root
      config={{
        navVariant: 'permanent',
        draggable: true,
        navWidth: startNavWidth,
      }}
    >
      <Nav>{text}</Nav>
      <NavWidth />
    </Root>
  )
  const dragHandle = getByRole('button', { name: /drag/i })

  expect(getByTestId('test')).toContainHTML('100')

  addEventListener.mockClear()
  removeEventListener.mockClear()

  await act(async () => {
    await drag(dragHandle)
  })

  expect(addEventListener).toBeCalledTimes(2)
  expect(removeEventListener).toBeCalledTimes(2)

  expect(getByTestId('test')).toContainHTML('300')
})
