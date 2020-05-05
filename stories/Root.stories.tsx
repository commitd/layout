import React, { FC, ReactNode } from 'react'
import { Root, Header, Nav, Content, Footer, NavListItem } from '../src'
import {
  ThemeProvider,
  createMuiTheme,
  Typography,
  IconButton,
  Box,
  Container,
  makeStyles,
  Theme,
  List,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs'
import { Position, Variant, Orientation, LayoutConfig } from '../src/util'
import { LoremIpsum } from 'lorem-ipsum'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Menu from '@material-ui/icons/Menu'

export default {
  title: 'Root',
  decorators: [withKnobs],
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    background: theme.palette.background.default,
  },
  menuItemText: {
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}))

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 32,
    min: 8,
  },
})

export const Default = () => {
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
        <Typography variant="body1">
          Use the knobs tab below to try out different props!
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
        <Typography variant="body1">
          This example uses breakpoints to change props as the window size
          changes. Try changing the size of your window.
        </Typography>
      }
    />
  )
}

const Example: FC<{ config: Partial<LayoutConfig>; content: ReactNode }> = ({
  config,
  content,
}) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={createMuiTheme()}>
      <Root style={{ minHeight: '100vh' }} config={config}>
        <Header chevronLeftIcon={<ChevronLeft />} menuIcon={<Menu />}>
          <Typography variant="h5">Application Name</Typography>
          <Box flexGrow={1} />
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Header>
        <Nav
          chevronLeftIcon={<ChevronLeft />}
          chevronRightIcon={<ChevronRight />}
          header={
            // you can provide fixed header inside nav
            // change null to some react element
            (ctx) => null
          }
        >
          <List>
            <NavListItem text="Menu Item 1" icon={<AccountCircle />} />
            <NavListItem text="Menu Item 2" icon={<AccountCircle />} />
            <NavListItem text="Menu Item 3" icon={<AccountCircle />} />
          </List>
        </Nav>
        <Content className={classes.content}>
          <Container maxWidth="lg">
            <Box pt={2}>
              <Box mb={2}>
                <Typography variant="h4">@committed/layout</Typography>
              </Box>
              {content}
              <Box mt={3}>
                {new Array(20).fill(null).map((i) => (
                  <Box mb={1}>
                    <Typography variant="body2" color="textSecondary">
                      {lorem.generateParagraphs(1)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Container>
        </Content>
        <Footer>
          <Box p={2}>
            <Typography>Footer</Typography>
          </Box>
        </Footer>
      </Root>
    </ThemeProvider>
  )
}
