import React from 'react'
import {
  Position,
  Variant,
  Orientation,
  HeaderResponse,
  Response,
  Root,
} from '../src'
import { Typography } from '@committed/components'
import { Example } from './Example'

export default {
  title: 'Components/Root',
  component: Root,
}

export const Default = () => {
  return (
    <Example
      content={
        <Typography variant="body2" color="textPrimary">
          This example is the default layout preset. In addition to defaults,
          it's clipped, squeezed and sticky. Try changing the size of your
          window.
        </Typography>
      }
    />
  )
}

export const Breakpointed = () => {
  return (
    <Example
      config={{
        navVariant: {
          xs: 'temporary',
          sm: 'temporary',
          lg: 'permanent',
          xl: 'permanent',
        },
        navWidth: {
          xs: 256,
          sm: 512,
          lg: 256,
          xl: 356,
        },
        collapsible: {
          xs: false,
          sm: false,
          lg: true,
          xl: true,
        },
      }}
      content={
        <Typography variant="body2" color="textPrimary">
          This example uses breakpoints to change props as the window size
          changes. Try changing the size of your window.
        </Typography>
      }
    />
  )
}

export const PartialBreakpointed = () => {
  return (
    <Example
      config={{
        navVariant: {
          sm: 'temporary',
          lg: 'permanent',
        },
        navWidth: {
          lg: 256,
          xl: 356,
        },
        collapsible: {
          sm: false,
          md: true,
        },
      }}
      content={
        <Typography variant="body2" color="textPrimary">
          This example uses only specifies where the behaviours change. Above
          and below should behave as the the closed set value. Try changing the
          size of your window.
        </Typography>
      }
    />
  )
}
