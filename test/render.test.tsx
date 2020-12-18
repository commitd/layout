import {
  Box,
  Container,
  IconButton,
  List,
  Typography,
} from '@committed/components'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { LoremIpsum } from 'lorem-ipsum'
import React from 'react'
import {
  Content,
  Footer,
  Header,
  Nav,
  NavListItem,
  Root,
  LayoutConfig,
  presets,
} from '../src'
import { fireEvent, render } from './setupTests'

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

export const Layout: React.FC<{ config?: Partial<LayoutConfig> }> = ({
  config,
}) => {
  return (
    <Root config={config}>
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
                <Box key={`lorem ${index}`} mb={1}>
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
  )
}

describe('Layout', () => {
  it('renders Header', () => {
    const { getByText } = render(<Layout />)
    const headerText = getByText('Application Name')
    expect(headerText).toBeInTheDocument()
  })
  it('renders Footer', () => {
    const { getByText } = render(<Layout />)
    const footerText = getByText('Footer')
    expect(footerText).toBeInTheDocument()
  })

  it('renders Content', () => {
    const { getByText } = render(<Layout />)
    const contentText = getByText('@committed/layout')
    expect(contentText).toBeInTheDocument()
  })

  it('renders at least one open menu', () => {
    const { getAllByLabelText } = render(<Layout />)
    const menuButton = getAllByLabelText(/Open/i)
    expect(menuButton[0]).toBeInTheDocument()
  })

  it('Can close nav once opened', () => {
    const { getAllByLabelText } = render(<Layout />)
    fireEvent.click(getAllByLabelText(/Open/i)[0])
    const closeButtons = getAllByLabelText(/Close/i)
    expect(closeButtons[0]).toBeInTheDocument()
  })

  it('Shows Nav once menu opened', () => {
    const { getByText, getAllByLabelText } = render(<Layout />)
    fireEvent.click(getAllByLabelText(/Open/i)[0])
    const menuItem1 = getByText(/Menu Item 1/i)
    expect(menuItem1).toBeInTheDocument()
    const menuItem2 = getByText(/Menu Item 2/i)
    expect(menuItem2).toBeInTheDocument()
    const menuItem3 = getByText(/Menu Item 3/i)
    expect(menuItem3).toBeInTheDocument()
  })

  it('Closes menu once opened', () => {
    const { getAllByLabelText } = render(<Layout />)
    fireEvent.click(getAllByLabelText(/Open/i)[0])
    fireEvent.click(getAllByLabelText(/Close/i)[0])
    const menuButton = getAllByLabelText(/Open/i)
    expect(menuButton[0]).toBeInTheDocument()
  })

  it('Nav list itel closes menu', () => {
    const { getAllByLabelText, getByText } = render(<Layout />)
    fireEvent.click(getAllByLabelText(/Open/i)[0])
    fireEvent.click(getByText(/Menu Item 1/i))
    const menuButton = getAllByLabelText(/Open/i)
    expect(menuButton[0]).toBeInTheDocument()
  })

  it('Can collapse if collapsible, then items get titles', () => {
    const { getByTitle, getAllByLabelText } = render(
      <Layout config={{ collapsible: true }} />
    )
    fireEvent.click(getAllByLabelText(/Open/i)[0])
    fireEvent.click(getAllByLabelText(/Collapse/i)[0])
    expect(getByTitle(/Menu Item 1/i)).toBeInTheDocument()
  })

  it('renders Header, Content and Footer in default fixed preset', () => {
    const { getByText } = render(
      <Layout config={presets.createFixedLayout()} />
    )
    getByText('Application Name')
    getByText('Footer')
    getByText('@committed/layout')
  })

  it('renders Header, Content and Footer in default content preset', () => {
    const { getByText } = render(
      <Layout config={presets.createContentBasedLayout()} />
    )
    getByText('Application Name')
    getByText('Footer')
    getByText('@committed/layout')
  })

  it('renders Header, Content and Footer in default cozy preset', () => {
    const { getByText } = render(<Layout config={presets.createCozyLayout()} />)
    getByText('Application Name')
    getByText('Footer')
    getByText('@committed/layout')
  })
})
