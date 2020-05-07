import React from 'react'
import { Typography, Icons } from '@committed/components'
import { Example } from './Example'

export const SuppliedIcons = () => {
  return (
    <Example
      config={{}}
      content={
        <Typography variant="body2" color="textPrimary">
          The icons used can be replaces by supplying the icons as props. In
          fact, any react node can be supplied but additional styling may be
          required Try changing the size of your window.
        </Typography>
      }
      closeMenuIcon={<Icons.KeyboardBackspace />}
      openMenuIcon={<Icons.FormatAlignJustify />}
      collapseIcon={<Icons.Check />}
      expandIcon={<Typography>></Typography>}
    />
  )
}

export default {
  title: 'Icons',
}
