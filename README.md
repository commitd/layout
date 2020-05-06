# Committed Components Layout

[![Committed Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fcommitted.software%2Fbadge)](https://committed.io)
[![Build Status](https://drone.committed.software/api/badges/commitd/layout/status.svg)](https://drone.committed.software/commitd/layout)

This is a simple layout for standard looking material based apps, based on [Mui Layout](https://mui-treasury.com/components/layout)
but using `@committed/components` as its base.

<p align="center">
  <img src="images/layout.png" style="width: 600px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"/>
</p>

## 🔗 Live Demo

Here's a [live demo](https://committed.software/docs)

## 🚀 Quickstart

For use with [`@committed/components`](https://github.com/commitd/components),

```bash
yarn add @committed/layout
```

add any missing peer dependencies

```bash
yarn add @committed/components @material-ui/core @material-ui/icons react react-dom
```

### Usage

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@committed/components'
import { Root, Header, Nav, NavListItem, Content, Footer, LayoutConfig } from '@committed/layout'

const config: Partial<LayoutConfig> = {
  // Only permanently show nav drawer at higher resolutions
  navVariant: {
    sm: 'temporary',
    lg: 'permanent',
  }
}

const App = () => (
   <ThemeProvider theme={theme}>
      <Root style={{ minHeight: '100vh' }} config={config}>
        <Header>
          <Typography variant="h5">Application Name</Typography>
        </Header>
        <Nav
          header={
            ctx => null
          }
        >
          <List>
            <NavListItem text="Menu Item 1" icon={<AccountCircle />} />
          </List>
        </Nav>
        <Content>
          Content
        </Content>
        <Footer>
          Footer
        </Footer>
      </Root>
    </ThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

## 📱 Responsive

The layout adjusts for small screen sizes.

<p align="center">
  <img src="images/mobile.png" style="width: 200px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"/>
</p>

## 📝 Config

For each config parameter a single value or an object with breakpoint keys can be supplied, e.g.

```javascript
const config = {
  navWidth: {
    // xs is 256px by default
    sm: 200, // in sm
    md: 256 // mdUp
  }
}
```

## Props

### Root.config

|Prop|Type|Description|Default Value|
|-|-|-|-|
|clipped|boolean \| ScreenProps\<boolean\>|Clipped moves the header over the top of the navigation drawer, unclipped makes navigation full height|false
|collapsible|boolean \| ScreenProps\<boolean\>|Can the navigation be collapsed to a smaller form|true|
|collapsedWidth|number \| ScreenProps\<number\>|Width of the collapsed navigation|64|
|footerShrink|boolean \| ScreenProps\<boolean\>|Footer to adjust the size to fit when nav expanded,set false to keep the same width and overflow the screen.|true|
|navAnchor|Orientation \| ScreenProps\<Orientation\>|Which side of the screen to show the nav panel|left|
|navVariant|Variant \| ScreenProps\<Variant\>|**Permanent**: stays all the time. **Persistent**: remains open but can be hidden with button. **Temporary**: hides on click away (and selection).|permanent|
|navWidth|number \| ScreenProps\<number\>|Width of the navigation drawer|256|
|headerPosition|Position \| ScreenProps\<Position\>|Position applied to the AppBar header. one of 'static', 'relative', 'sticky', 'fixed', 'absolute' See https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning|relative|
|squeezed|boolean \| ScreenProps\<\>|Both header and content adjust the size to fit when nav expanded, set false to keep the same width and overflow the screen.|boolean|

### Root.component

### Nav.component
### Nav.header
`ReactNode`
### Nav.closeButtonProps
Props to pass to the underlying Close Button. `IconButtonProps`
## Nav.collapseIcon
Icon to collapse the menu drawer.
## Nav.expandIcon
Icon to expand the menu drawer.
### NavListItem
See @committed/components ListItem Props. In Addition, see below:
## NavListItem.listItemIconProps
See @committed/components ListItemIcon Props
## NavListItem.listItemTextProps
See @committed/components ListItemText Props

### Content.component

### Header.position
One of 'static', 'relative', 'sticky', 'fixed', 'absolute'. See `Root.headerPosition`.
### Header.toolbarProps
Props to pass to the underlying Toolbar. `commitd/components ToolbarProps`
### Header.menuButtonProps
Props to pass to the underlying Menu Button. `IconButtonProps`
### Header.closeMenuIcon
Icon to close the menu drawer.
### Header.openMenuIcon
Icon to open the menu drawer.
### Header.color

### Footer.component


## 💻 Development

On first use run `yarn install` in both the root folder and the example folder.

The main build is currently performed using Rollup:

```bash
yarn build
```

For development use

```bash
yarn start
```

the same command can be run in the example folder to run a usage example.

## 🤖 CI

Pull requests go through CI checks using GitHub actions.

## 👏 Credit

It is based on Mui Layout from https://mui-treasury.com/
for further reference see https://github.com/siriwatknp/mui-layout.

## ©️ License

[MIT](/LICENSE) - © Committed Software 2019 <https://committed.io>
