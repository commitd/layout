import {
  Box,
  Card,
  Container,
  Heading,
  IconButton,
  List,
  ThemeProvider,
  ThemeSwitch,
  Typography,
} from '@committed/components'
import AccountCircle from '@material-ui/icons/AccountCircleSharp'
import { LoremIpsum } from 'lorem-ipsum'
import React, { FC, ReactNode } from 'react'
import {
  Content,
  Footer,
  Header,
  LayoutConfig,
  Nav,
  NavListItem,
  Root,
  useLayout,
} from '../src'

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

export const Themed: FC<{
  config?: Partial<LayoutConfig>
  content: ReactNode
  closeMenuIcon?: ReactNode
  draggable?: boolean
  openMenuIcon?: ReactNode
  collapseIcon?: ReactNode
  expandIcon?: ReactNode
}> = ({
  config,
  content,
  closeMenuIcon,
  draggable = false,
  openMenuIcon,
  collapseIcon,
  expandIcon,
}) => (
  <ThemeProvider>
    <Root contained style={{ minHeight: '50vh' }} config={config}>
      <Header closeMenuIcon={closeMenuIcon} openMenuIcon={openMenuIcon}>
        <Typography variant="h5">Application Name</Typography>
        <Box flexGrow={1} />
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <ThemeSwitch variant="celestial" />
      </Header>
      <Nav
        collapseIcon={collapseIcon}
        expandIcon={expandIcon}
        draggable={draggable}
        header={React.createElement(() => {
          const { collapsed } = useLayout()
          return (
            <Heading.h2 align="center">{collapsed ? 'M' : 'Menu'}</Heading.h2>
          )
        })}
      >
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
            <Card p={3}>{content}</Card>
            <Box mt={3}>
              {[...Array(10).keys()].map((i) => (
                <Box key={'lorem' + i} mb={1}>
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
