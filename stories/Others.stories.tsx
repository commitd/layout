import {
  Box,
  Container,
  IconButton,
  List,
  ThemeProvider,
  Typography,
} from '@committed/components'
import AccountCircle from '@material-ui/icons/AccountCircleSharp'
import React from 'react'
import { Content, Footer, Header, Nav, NavListItem, Root } from '../src'
import { lorem } from './Example'

export default {
  title: 'Examples/Missing',
}

export const NoHeader = () => {
  return (
    <ThemeProvider>
      <Root contained style={{ minHeight: '50vh' }} config={{}}>
        <Nav>
          <List>
            <NavListItem key="1" text="Menu Item 1" icon={<AccountCircle />} />
            <NavListItem key="2" text="Menu Item 2" icon={<AccountCircle />} />
            <NavListItem key="3" text="Menu Item 3" icon={<AccountCircle />} />
          </List>
        </Nav>
        <Content>
          <Container maxWidth="lg">
            <Box pt={2}>
              <Box mb={2}>
                <Typography variant="h4">@committed/layout</Typography>
              </Box>
              <Typography variant="body2" color="textPrimary">
                Testing behaviours with missing components.
              </Typography>
              <Box mt={3}>
                {new Array(10).fill(null).map((_, index) => (
                  <Box key={'lorem' + index} mb={1}>
                    <Typography variant="body1" color="textSecondary">
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

export const NoNav = () => {
  return (
    <ThemeProvider>
      <Root
        contained
        style={{ minHeight: '50vh' }}
        config={{ navWidth: 0 }}
      >
        <Header>
          <Typography variant="h5">Application Name</Typography>
          <Box flexGrow={1} />
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Header>
        <Content>
          <Container maxWidth="lg">
            <Box pt={2}>
              <Box mb={2}>
                <Typography variant="h4">@committed/layout</Typography>
              </Box>
              <Typography variant="body2" color="textPrimary">
                Testing behaviours with missing components. Missing nav should
                set response to static, or set nav sizes to 0. As Nav assumed
                open on start
              </Typography>
              <Box mt={3}>
                {new Array(10).fill(null).map((_, index) => (
                  <Box key={'lorem' + index} mb={1}>
                    <Typography variant="body1" color="textSecondary">
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

export const NoFooter = () => {
  return (
    <ThemeProvider>
      <Root contained style={{ minHeight: '50vh' }} config={{}}>
        <Header>
          <Typography variant="h5">Application Name</Typography>
          <Box flexGrow={1} />
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Header>
        <Nav>
          <List>
            <NavListItem key="1" text="Menu Item 1" icon={<AccountCircle />} />
            <NavListItem key="2" text="Menu Item 2" icon={<AccountCircle />} />
            <NavListItem key="3" text="Menu Item 3" icon={<AccountCircle />} />
          </List>
        </Nav>
        <Content>
          <Container maxWidth="lg">
            <Box pt={2}>
              <Box mb={2}>
                <Typography variant="h4">@committed/layout</Typography>
              </Box>
              <Typography variant="body2" color="textPrimary">
                Testing behaviours with missing components.
              </Typography>
              <Box mt={3}>
                {new Array(10).fill(null).map((_, index) => (
                  <Box key={'lorem' + index} mb={1}>
                    <Typography variant="body1" color="textSecondary">
                      {lorem.generateParagraphs(1)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Container>
        </Content>
      </Root>
    </ThemeProvider>
  )
}
