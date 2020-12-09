// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
/**
 * Import setupTests for your unit tests and you can use `render`, `renderLight` and `renderDark` to render elements wrapped in a ThemeProvider.
 * To render without a theme provider use `renderPlain`.
 *
 * N.B. This adds a simple custom id generator so ids match between snapshots.
 *
 */
import { StylesProvider } from '@material-ui/styles'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GenerateId } from 'jss'
import React from 'react'
import { ThemeProvider } from '@committed/components'

const generateClassName: GenerateId = (rule, styleSheet) => {
  const prefix =
    styleSheet === undefined || styleSheet.options.classNamePrefix === undefined
      ? ''
      : styleSheet.options.classNamePrefix
  return `${prefix}-${rule.key}`
}

const LightTheme: React.FC = ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider choice="light">{children}</ThemeProvider>
  </StylesProvider>
)

const DarkTheme: React.FC = ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider choice="dark">{children}</ThemeProvider>
  </StylesProvider>
)

export const renderPlain = render

export const renderLight = (
  ui: Readonly<React.ReactElement>,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: LightTheme, ...options })

export const renderDark = (
  ui: Readonly<React.ReactElement>,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: DarkTheme, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { renderLight as render }
export { userEvent }
