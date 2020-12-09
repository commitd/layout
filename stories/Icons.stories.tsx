import { Typography } from '@committed/components'
import Check from '@material-ui/icons/CheckSharp'
import FormatAlignJustify from '@material-ui/icons/FormatAlignJustifySharp'
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspaceSharp'
import React from 'react'
import { Example } from './Example'

export const SuppliedIcons = () => {
  return (
    <Example
      content={
        <Typography variant="body2" color="textPrimary">
          The icons used can be replaces by supplying the icons as props. In
          fact, any react node can be supplied but additional styling may be
          required Try changing the size of your window.
        </Typography>
      }
      closeMenuIcon={<KeyboardBackspace />}
      openMenuIcon={<FormatAlignJustify />}
      collapseIcon={<Check />}
      expandIcon={<Typography>></Typography>}
    />
  )
}

export default {
  title: 'Examples/Icons',
}
