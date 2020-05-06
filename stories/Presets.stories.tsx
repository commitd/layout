import React from 'react'
import { presets } from '../src'
import { Typography } from '@committed/components'
import { Example } from './Example'

export default {
  title: 'Presets',
}

export const PresetDefaultFixedLayout = () => {
  return (
    <Example
      config={presets.createDefaultLayout()}
      content={
        <Typography variant="body2" color="textPrimary">
          This example the default layout preset. (No need to supply as used if
          nothing supplied. Try changing the size of your window.
        </Typography>
      }
    />
  )
}

export const PresetFixedLayout = () => {
  return (
    <Example
      config={presets.createFixedLayout()}
      content={
        <Typography variant="body2" color="textPrimary">
          This example the fixed layout preset. In addition to defaults, it's
          clipped, squeezed and sticky. Try changing the size of your window.
        </Typography>
      }
    />
  )
}

export const PresetContentBasedLayout = () => {
  return (
    <Example
      config={presets.createContentBasedLayout()}
      content={
        <Typography variant="body2" color="textPrimary">
          This example the content layout preset. Nav is not collapsible, but
          temporary for xs. Try changing the size of your window.
        </Typography>
      }
    />
  )
}

export const PresetCozyLayout = () => {
  return (
    <Example
      config={presets.createCozyLayout()}
      content={
        <Typography variant="body2" color="textPrimary">
          This example the cozy layout preset. Nav is permanent and collapsible
          generally, persistent and not collapsible when xs. Width variesTry
          changing the size of your window.
        </Typography>
      }
    />
  )
}
