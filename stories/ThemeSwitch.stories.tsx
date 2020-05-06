import React from 'react'
import { Typography } from '@committed/components'
import { Themed } from './Themed'

export const ThemeSwitch = () => {
  return (
    <Themed
      config={{}}
      content={
        <Typography variant="body2" color="textPrimary">
          Adds a theme swith so you can see the layout in both light and dark
          themes.
        </Typography>
      }
    />
  )
}

export default {
  title: 'ThemeSwitch',
}
