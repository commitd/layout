import React from 'react'
import { Root, Footer } from '../src'
import { ThemeProvider, Typography } from '@committed/components'

export const Use = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '10vh' }}>
        <Footer>
          <Typography>This is the footer</Typography>
        </Footer>
      </Root>
    </ThemeProvider>
  )
}

export default {
  title: 'Components|Footer',
  component: Footer,
}

export const Secondary = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '10vh' }}>
        <Footer color="secondary.contrastText" bgcolor="secondary.main">
          <Typography p={3}>This is the footer</Typography>
        </Footer>
      </Root>
    </ThemeProvider>
  )
}

export const BlackAndWhite = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '10vh' }}>
        <Footer color="white" bgcolor="black">
          <Typography p={3}>This is the footer</Typography>
        </Footer>
      </Root>
    </ThemeProvider>
  )
}

export const Hex = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '10vh' }}>
        <Footer color="#DDDDDD" bgcolor="#D01020">
          <Typography p={5}>This is the footer</Typography>
        </Footer>
      </Root>
    </ThemeProvider>
  )
}
