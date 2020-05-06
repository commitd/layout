import React, { FC, ReactNode } from 'react'
import { Position, Variant, Orientation } from '../src'
import { Typography } from '@committed/components'
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs'
import { Example } from './Example'

export default {
  title: 'Root',
  decorators: [withKnobs],
}

export const Default = () => {
  return (
    <Example
      config={{}}
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

export const WithKnobs = () => {
  return (
    <Example
      config={{
        clipped: boolean('clipped', false),
        collapsedWidth: number('collapsedWidth', 64, {
          range: true,
          min: 0,
          max: 512,
          step: 1,
        }),
        collapsible: boolean('collapsible', true),
        footerShrink: boolean('footerShrink', true),
        headerPosition: select(
          'headerPosition',
          {
            static: 'static',
            relative: 'relative',
            sticky: 'sticky',
            fixed: 'fixed',
            absolute: 'absolute',
          },
          'relative'
        ) as Position,
        navAnchor: select(
          'navAnchor',
          {
            left: 'left',
            right: 'right',
          },
          'left'
        ) as Orientation,
        navVariant: select(
          'navVariant',
          {
            permanent: 'permanent',
            temporary: 'temporary',
            persistent: 'persistent',
          },
          'permanent'
        ) as Variant,
        navWidth: number('navWidth', 256, {
          range: true,
          min: 0,
          max: 512,
          step: 1,
        }),
        squeezed: false,
      }}
      content={
        <Typography variant="body2" color="textPrimary">
          Use the knobs tab below to try out different props!
        </Typography>
      }
    />
  )
}

WithKnobs.decorators = [withKnobs]

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
