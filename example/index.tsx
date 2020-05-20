import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  Root,
  Header,
  Nav,
  NavListItem,
  Content,
  Footer,
  LayoutConfig,
  useLayout,
} from '../dist'
import {
  ThemeProvider,
  Typography,
  Box,
  IconButton,
  Monospace,
  List,
  Container,
  ThemeSwitch,
} from '@committed/components'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { LoremIpsum } from 'lorem-ipsum'

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

const config: Partial<LayoutConfig> = {
  navVariant: {
    sm: 'temporary',
    md: 'persistent',
    lg: 'permanent',
  },
  headerPosition: {
    sm: 'relative',
    md: 'sticky',
  },
  collapsible: {
    md: true,
    lg: false,
  },
  headerResponse: {
    sm: 'static',
    md: 'squeezed',
  },
  contentResponse: {
    sm: 'static',
    md: 'squeezed',
  },
  footerResponse: {
    sm: 'static',
    md: 'squeezed',
  },
}
const Layout = () => {
  const layout = useLayout()
  return <Monospace>{JSON.stringify(layout, null, 2)}</Monospace>
}

const App = () => (
  <ThemeProvider>
    <Root config={config}>
      <Header>
        <Typography variant="h5">Application Name</Typography>
        <Box flexGrow={1} />
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <ThemeSwitch />
      </Header>
      <Nav>
        <List>
          <NavListItem
            key="item1"
            text="Menu Item 1"
            icon={<AccountCircle />}
          />
          <NavListItem
            key="item2"
            text="Menu Item 2"
            icon={<AccountCircle />}
          />
          <NavListItem
            key="item3"
            text="Menu Item 3"
            icon={<AccountCircle />}
          />
        </List>
      </Nav>
      <Content>
        <Container maxWidth="lg">
          <Box pt={2}>
            <Box mb={2}>
              <Typography variant="h4">@committed/layout</Typography>
            </Box>
            <Layout />
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

ReactDOM.render(<App />, document.getElementById('root'))
