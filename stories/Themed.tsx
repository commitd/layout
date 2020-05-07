import React, { FC, ReactNode } from 'react'
import {
  Root,
  Header,
  Nav,
  Content,
  Footer,
  NavListItem,
  LayoutConfig,
  useLayout,
} from '../src'
import {
  ThemeSwitch,
  ThemeProvider,
  Typography,
  IconButton,
  Box,
  Icons,
  Container,
  Heading,
  List,
  useThemeChoice,
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

export const Themed: FC<{
  config?: Partial<LayoutConfig>
  content: ReactNode
  closeMenuIcon?: ReactNode
  openMenuIcon?: ReactNode
  collapseIcon?: ReactNode
  expandIcon?: ReactNode
}> = ({
  config,
  content,
  closeMenuIcon,
  openMenuIcon,
  collapseIcon,
  expandIcon,
}) => {
  const [themeChoice, toggleThemeChoice, componentMounted] = useThemeChoice()
  const component = componentMounted ? (
    <ThemeProvider choice={themeChoice}>
      <Root style={{ minHeight: '50vh' }} config={config}>
        <Header closeMenuIcon={closeMenuIcon} openMenuIcon={openMenuIcon}>
          <Typography variant="h5">Application Name</Typography>
          <Box flexGrow={1} />
          <IconButton color="inherit">
            <Icons.AccountCircle />
          </IconButton>
          <ThemeSwitch
            themeChoice={themeChoice}
            toggleThemeChoice={toggleThemeChoice}
            variant="celestial"
          />
        </Header>
        <Nav
          collapseIcon={collapseIcon}
          expandIcon={expandIcon}
          header={React.createElement(() => {
            const { collapsed } = useLayout()
            return (
              <Heading.h2 align="center">{collapsed ? 'M' : 'Menu'}</Heading.h2>
            )
          })}
        >
          <List>
            <NavListItem text="Menu Item 1" icon={<Icons.AccountCircle />} />
            <NavListItem text="Menu Item 2" icon={<Icons.AccountCircle />} />
            <NavListItem text="Menu Item 3" icon={<Icons.AccountCircle />} />
          </List>
        </Nav>
        <Content>
          <Container maxWidth="lg">
            <Box pt={2}>
              <Box mb={2}>
                <Typography variant="h4">@committed/layout</Typography>
              </Box>
              {content}
              <Box mt={3}>
                {new Array(10).fill(null).map((i) => (
                  <Box mb={1}>
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
  ) : null

  return component
}
