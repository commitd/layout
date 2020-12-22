import { Typography } from '@committed/components'
import React from 'react'
import {
  HeaderResponse,
  Orientation,
  Position,
  Response,
  Variant,
} from '../src'
import { Themed } from './Themed'
import { Meta, Story } from '@storybook/react'

export interface ControlledDocsProps {
  /**
   * Can the navigation be collapsed to a smaller form
   * @default true
   */
  collapsible: boolean
  /**
   * Can the navigation be dragged to resize
   * @default false
   */
  draggable: boolean
  /**
   * Width of the collapsed navigation (px)
   * @default 64
   */
  collapsedWidth: number
  /**
   * Which side of the screen to show the navigation panel
   * @default left
   */
  navAnchor: Orientation
  /**
   * Navigation variant:
   * - permanent: stays all the time
   * - persistent: remains open but can be hidden with button
   * - temporary: hides on click away (and selection)
   * @default permanent
   */
  navVariant: Variant
  /**
   * Width of the navigation drawer (px)
   * @default 256
   */
  navWidth: number
  /**
   * Position applied to the AppBar header
   * one of 'static', 'relative', 'sticky', 'fixed', 'absolute'
   * See https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
   * @default relative
   */
  headerPosition: Position
  /**
   * How should the header and content adjust the size and position to fit when nav expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer.
   *  - clipped: moves the header over the top of the navigation drawer
   *
   * @default squeezed
   */
  headerResponse: HeaderResponse
  /**
   * How should the header and content adjust the size and position to fit when nav expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer.
   *
   * @default squeezed
   */
  contentResponse: Response
  /**
   * How should the Footer adjust its size and position when nav expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer.
   *
   * @default squeezed
   */
  footerResponse: Response
}

/**
 * Controlled example.
 */
export const ControlledDocs: React.FC<ControlledDocsProps> = (
  _props: ControlledDocsProps
) => null
ControlledDocs.defaultProps = {
  collapsedWidth: 64,
  collapsible: true,
  draggable: false,
  headerPosition: 'relative',
  navAnchor: 'left',
  navVariant: 'permanent',
  navWidth: 256,
  headerResponse: 'squeezed',
  contentResponse: 'squeezed',
  footerResponse: 'squeezed',
}

export default {
  title: 'Examples/Controlled',
  component: ControlledDocs,
  excludeStories: ['ControlledDocs'],
  argTypes: {
    collapsedWidth: {
      control: {
        type: 'range',
        min: 0,
        max: 512,
        step: 1,
      },
    },
    collapsible: {},
    draggable: {},
    headerPosition: {
      control: {
        type: 'select',
        options: ['static', 'relative', 'sticky', 'fixed', 'absolute'],
      },
    },
    navAnchor: {
      control: {
        type: 'select',
        options: ['left', 'right'],
      },
    },
    navVariant: {
      control: {
        type: 'select',
        options: ['permanent', 'temporary', 'persistent'],
      },
    },
    navWidth: {
      control: { type: 'range', min: 0, max: 512, step: 1 },
    },
    headerResponse: {
      control: {
        type: 'select',
        options: ['clipped', 'static', 'squeezed', 'pushed'],
      },
    },
    contentResponse: {
      control: {
        type: 'select',
        options: ['static', 'squeezed', 'pushed'],
      },
    },
    footerResponse: {
      control: {
        type: 'select',
        options: ['static', 'squeezed', 'pushed'],
      },
    },
  },
} as Meta

const Template: Story<ControlledDocsProps> = ({
  collapsedWidth,
  collapsible,
  draggable,
  headerPosition,
  navAnchor,
  navVariant,
  navWidth,
  headerResponse,
  contentResponse,
  footerResponse,
}) => {
  return (
    <Themed
      config={{
        collapsedWidth,
        collapsible,
        draggable,
        headerPosition,
        navAnchor,
        navVariant,
        navWidth,
        headerResponse,
        contentResponse,
        footerResponse,
      }}
      content={
        <Typography variant="body2" color="textPrimary">
          In canvas view, use the knobs tab below to try out different props!
        </Typography>
      }
    />
  )
}

export const Default = Template.bind({})
Default.args = ControlledDocs.defaultProps
