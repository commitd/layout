import React from 'react'
import { Root, Content } from '../src'
import { ThemeProvider, Typography } from '@committed/components'

export const Use = () => {
  return (
    <ThemeProvider>
      <Root fullscreen={false} style={{ minHeight: '50vh' }}>
        <Content>
          <Typography>This is the content</Typography>
        </Content>
      </Root>
    </ThemeProvider>
  )
}

export default {
  title: 'Components|Content',
  component: Content,
}
