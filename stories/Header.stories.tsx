import React from 'react'
import { Root, Header } from '../src'
import { ThemeProvider, Typography } from '@committed/components'

export const Use = () => {
  return (
    <ThemeProvider>
      <Root style={{ minHeight: '10vh' }}>
        <Header>
          <Typography>This is the Header</Typography>
        </Header>
      </Root>
    </ThemeProvider>
  )
}

export const Secondary = () => {
  return (
    <ThemeProvider>
      <Root style={{ minHeight: '10vh' }}>
        <Header color="secondary">
          <Typography>This is the Header</Typography>
        </Header>
      </Root>
    </ThemeProvider>
  )
}

export const Default = () => {
  return (
    <ThemeProvider>
      <Root style={{ minHeight: '10vh' }}>
        <Header color="default">
          <Typography>This is the Header</Typography>
        </Header>
      </Root>
    </ThemeProvider>
  )
}

export const Transparent = () => {
  return (
    <ThemeProvider>
      <Root style={{ minHeight: '10vh' }}>
        <Header color="transparent">
          <Typography>This is the Header</Typography>
        </Header>
      </Root>
    </ThemeProvider>
  )
}

export default {
  title: 'Components|Header',
  component: Header,
}
