import React from 'react'
import ReactDOM from 'react-dom'

import { Root, Header, Nav, Content, Footer, NavListItem } from '../src'
import {
  ThemeProvider,
  Typography,
  IconButton,
  Box,
  Icons,
  Container,
  List,
} from '@committed/components'
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 3,
    min: 1,
  },
  wordsPerSentence: {
    max: 16,
    min: 8,
  },
})

export const Example = () => {
  return (
    <ThemeProvider>
      <Root style={{ minHeight: '50vh' }}>
        <Header>
          <Typography variant="h5">Application Name</Typography>
          <Box flexGrow={1} />
          <IconButton color="inherit">
            <Icons.AccountCircle />
          </IconButton>
        </Header>
        <Nav>
          <List>
            <NavListItem
              key="1"
              text="Menu Item 1"
              icon={<Icons.AccountCircle />}
            />
            <NavListItem
              key="2"
              text="Menu Item 2"
              icon={<Icons.AccountCircle />}
              selected
            />
            <NavListItem
              key="3"
              text="Menu Item 3"
              icon={<Icons.AccountCircle />}
            />
          </List>
        </Nav>
        <Content>
          <Container maxWidth="lg">
            <Box pt={2}>
              <Box mb={2}>
                <Typography variant="h4">@committed/layout</Typography>
              </Box>
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

describe('Layout', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Example />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
