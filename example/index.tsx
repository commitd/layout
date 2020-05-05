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
} from '../.'
import {
  ThemeProvider,
  createMuiTheme,
  Typography,
  Box,
  IconButton,
  List,
  Container,
  makeStyles,
  Theme,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { LoremIpsum } from 'lorem-ipsum'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import Menu from '@material-ui/icons/Menu'

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

const config: Partial<LayoutConfig> = {
  navVariant: {
    xs: 'temporary',
    sm: 'temporary',
    lg: 'permanent',
    xl: 'permanent',
  },
}

const theme = createMuiTheme()

const App = () => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Root style={{ minHeight: '100vh' }} config={config}>
        <Header chevronLeftIcon={<ChevronLeft />} menuIcon={<Menu />}>
          <Typography variant="h5">Application Name</Typography>
          <Box flexGrow={1} />
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Header>
        <Nav
          header={
            // you can provide fixed header inside nav
            // change null to some react element
            (ctx) => null
          }
          chevronLeftIcon={<ChevronLeft />}
          chevronRightIcon={<ChevronRight />}
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

ReactDOM.render(<App />, document.getElementById('root'))
