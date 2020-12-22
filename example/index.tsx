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
  LAYOUT_CONFIG_DEFAULTS,
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
  FormGroup,
  FormControlLabel,
  Switch,
  CheckToken,
  Slider,
  Divider,
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

const text = lorem.generateParagraphs(1)

const Layout = () => {
  const layout = useLayout()
  return <Monospace>{JSON.stringify(layout, null, 2)}</Monospace>
}

interface SelectorProps {
  label: string
  value: string
  setValue: (newValue: string) => void
  values: string[]
}

const Selector = ({ label, value, setValue, values }: SelectorProps) => (
  <>
    <Typography mt={3}>{label}</Typography>
    {values.map((key) => (
      <CheckToken
        color="primary"
        selected={value === key}
        onClick={() => setValue(key)}
      >
        {key}
      </CheckToken>
    ))}
    <Divider mx={2} />
  </>
)

interface NavWidthProps {
  setConfigNavWidth: (newValue: number) => void
}

const NavWidth = ({ setConfigNavWidth }) => {
  const [hasDragged, setHasDragged] = React.useState(false)
  const {
    navWidth,
    dragged,
    setNavWidth,
    maxNavWidth,
    collapsedWidth,
  } = useLayout()

  React.useEffect(() => {
    if (dragged) setHasDragged(true)
  }, [dragged])

  const handleChange = (e: any, value: number) => {
    if (hasDragged) {
      setNavWidth(value)
    } else {
      setConfigNavWidth(value)
    }
  }
  return (
    <Slider
      value={navWidth}
      onChange={handleChange}
      valueLabelDisplay="auto"
      min={collapsedWidth}
      max={maxNavWidth}
    />
  )
}

const App = () => {
  const [draggable, setDraggable] = React.useState(false)

  const [collapsible, setCollapsible] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.collapsible
  )
  const [collapsedWidth, setCollapsedWidth] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.collapsedWidth
  )
  const [navAnchor, setNavAnchor] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.navAnchor
  )
  const [navVariant, setNavVariant] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.navVariant
  )
  const [navWidth, setNavWidth] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.navWidth
  )
  const [maxNavWidth, setMaxNavWidth] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.maxNavWidth
  )
  const [headerPosition, setHeaderPosition] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.headerPosition
  )
  const [headerResponse, setHeaderResponse] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.headerResponse
  )
  const [contentResponse, setContentResponse] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.contentResponse
  )
  const [footerResponse, setFooterResponse] = React.useState(
    LAYOUT_CONFIG_DEFAULTS.footerResponse
  )

  const config = {
    collapsible,
    collapsedWidth,
    draggable,
    navAnchor,
    navVariant,
    navWidth,
    maxNavWidth,
    headerPosition,
    headerResponse,
    contentResponse,
    footerResponse,
  }

  return (
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
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={draggable}
                      onChange={() => setDraggable(!draggable)}
                      color="primary"
                    />
                  }
                  label="Draggable"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={collapsible}
                      onChange={() => setCollapsible(!collapsible)}
                      color="secondary"
                    />
                  }
                  label="Collapsible"
                />
              </FormGroup>
              <Typography>Collapsed Width</Typography>
              <Slider
                value={collapsedWidth}
                onChange={(_e, value) => setCollapsedWidth(value)}
                valueLabelDisplay="auto"
                min={32}
                max={128}
              />
              <Typography>Nav width</Typography>
              <NavWidth setConfigNavWidth={setNavWidth} />
              <Typography>Max Nav width</Typography>
              <Slider
                value={maxNavWidth}
                onChange={(_e, value) => setMaxNavWidth(value)}
                valueLabelDisplay="auto"
                min={64}
                max={2024}
              />
              <Selector
                label="NavVariant"
                value={navVariant}
                setValue={setNavVariant}
                values={['permanent', 'persistent', 'temporary']}
              />
              <Selector
                label="NavAnchor"
                value={navAnchor}
                setValue={setNavAnchor}
                values={['left', 'right']}
              />
              <Selector
                label="HeaderPosition"
                value={headerPosition}
                setValue={setHeaderPosition}
                values={['static', 'relative', 'sticky', 'fixed', 'absolute']}
              />
              <Selector
                label="HeaderResponse"
                value={headerResponse}
                setValue={setHeaderResponse}
                values={['static', 'squeezed', 'pushed', 'clipped']}
              />
              <Selector
                label="ContentResponse"
                value={contentResponse}
                setValue={setContentResponse}
                values={['static', 'squeezed', 'pushed']}
              />
              <Selector
                label="FooterResponse"
                value={footerResponse}
                setValue={setFooterResponse}
                values={['static', 'squeezed', 'pushed']}
              />
              <Box mt={3}>
                {new Array(20).fill(null).map((i) => (
                  <Box mb={1}>
                    <Typography variant="body2" color="textSecondary">
                      {text}
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
