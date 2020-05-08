import React from 'react'
import { presets, LayoutConfig } from '../src'
import { Typography, Monospace, Heading } from '@committed/components'
import { Example } from './Example'

export default {
  title: 'Examples|Presets',
  component: presets,
}

const Preset = ({
  config,
  text,
}: {
  config: Partial<LayoutConfig>
  text: string
}) => (
  <Example
    config={config}
    content={
      <>
        <Typography variant="body2" color="textPrimary">
          {text}
        </Typography>
        <Heading.h3 pt={2}>Config</Heading.h3>
        <Monospace>{JSON.stringify(config, null, 2)}</Monospace>
      </>
    }
  />
)

export const PresetDefaultFixedLayout = () => (
  <Preset
    config={presets.createDefaultLayout()}
    text="This example the default layout preset. (No need to supply as used
            if nothing supplied. Try changing the size of your window."
  />
)

export const PresetFixedLayout = () => (
  <Preset
    config={presets.createFixedLayout()}
    text="This example the fixed layout preset. In addition to defaults, it's
          clipped, squeezed and sticky. Try changing the size of your window."
  />
)

export const PresetContentBasedLayout = () => (
  <Preset
    config={presets.createContentBasedLayout()}
    text="This example the content layout preset. Nav is not collapsible, but
          temporary for xs. Try changing the size of your window."
  />
)

export const PresetCozyLayout = () => (
  <Preset
    config={presets.createCozyLayout()}
    text="
          This example the cozy layout preset. Nav is permanent and collapsible
          generally, persistent and not collapsible when xs. Width variesTry
          changing the size of your window."
  />
)
