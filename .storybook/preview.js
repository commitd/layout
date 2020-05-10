import React from 'react'
import { addParameters } from '@storybook/react'
import committedTheme from './theme.js'

addParameters({
  options: {
    // Currently required here as well as in manager.js - should be able to remove in 6.0
    theme: committedTheme,
  },
})