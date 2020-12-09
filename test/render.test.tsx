import {
  Box,
  Container,
  IconButton,
  List,
  ThemeProvider,
  Typography,
} from '@committed/components'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { LoremIpsum } from 'lorem-ipsum'
import React from 'react'
import ReactDOM from 'react-dom'
import { Content, Footer, Header, Nav, NavListItem, Root } from '../src'

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
      <Root contained style={{ minHeight: '50vh' }}>
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
            <NavListItem
              key="2"
              text="Menu Item 2"
              icon={<AccountCircle />}
              selected
            />
            <NavListItem key="3" text="Menu Item 3" icon={<AccountCircle />} />
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
