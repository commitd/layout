import { Typography } from '@committed/components'
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import {
  HeaderResponse,
  Orientation,
  Position,
  Response,
  Variant,
} from '../src'
import { Themed } from './Themed'

export default {
  title: 'Examples|With Knobs',
  decorators: [withKnobs],
}

export const WithKnobs = () => {
  return (
    <Themed
      config={{
        collapsedWidth: number('collapsedWidth', 64, {
          range: true,
          min: 0,
          max: 512,
          step: 1,
        }),
        collapsible: boolean('collapsible', true),
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
        headerResponse: select(
          'headerResponse',
          {
            clipped: 'clipped',
            static: 'static',
            squeezed: 'squeezed',
            pushed: 'pushed',
          },
          'squeezed'
        ) as HeaderResponse,
        contentResponse: select(
          'contentResponse',
          {
            static: 'static',
            squeezed: 'squeezed',
            pushed: 'pushed',
          },
          'squeezed'
        ) as Response,
        footerResponse: select(
          'footerResponse',
          {
            static: 'static',
            squeezed: 'squeezed',
            pushed: 'pushed',
          },
          'squeezed'
        ) as Response,
      }}
      content={
        <Typography variant="body2" color="textPrimary">
          In canvas view, use the knobs tab below to try out different props!
        </Typography>
      }
    />
  )
}
