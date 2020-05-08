import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
export type { Breakpoint }

export type Variant = 'permanent' | 'persistent' | 'temporary'

export type Position = 'static' | 'relative' | 'sticky' | 'fixed' | 'absolute'

export type Orientation = 'left' | 'right'

export type ScreenProps<P> = Partial<Record<Breakpoint, P>>

export interface Layout {
  /**
   * Is the navigation panel currently open
   */
  open: boolean
  /**
   * Is the navigation currently collapsed
   */
  collapsed: boolean
  /**
   * In which breakpoint range is the screen currently
   */
  screen: Breakpoint
  /**
   * Function to control the collapsed state.
   * Set explicitly using a boolean or pass an object to toggle (this allow convenient use as a mouse event handler)
   */
  setCollapsed: (val: boolean | object) => any
  /**
   * Function to control the open state.
   * Set explicitly using a boolean or pass an object to toggle (this allow convenient use as a mouse event handler)
   */
  setOpen: (val: boolean | object) => any

  // The below is the LayoutConfig for the current screen size

  /**
   * clipped, moves the header over the top of the navigation drawer
   * unclipped makes navigation full height
   * @default false
   */
  clipped: boolean
  /**
   * Can the navigation be collapsed to a smaller form
   * @default true
   */
  collapsible: boolean
  /**
   * Width of the collapsed navigation
   * @default 64
   */
  collapsedWidth: number

  /**
   * Should the Footer adjust the size to fit when nav expanded,
   * set false to keep the same width and overflow the screen.
   * @default true
   */
  footerShrink: boolean
  /**
   * Which side of the screen to show the navigation panel
   * @default left
   */
  navAnchor: Orientation
  /**
   * Navigation variant:
   * - permanent: stays all the time
   * - persistent: remains open but can be hidden with button
   * - temporary: hides on click away (and selection)
   * @default permanent
   */
  navVariant: Variant
  /**
   * Width of the navigation drawer
   * @default 256
   */
  navWidth: number
  /**
   * Position applied to the AppBar header
   * one of 'static', 'relative', 'sticky', 'fixed', 'absolute'
   * See https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
   * @default relative
   */
  headerPosition: Position
  /**
   * Both header and content adjust the size to fit when nav expanded,
   * set false to keep the same width and overflow the screen.
   * @default true
   */
  squeezed: boolean
}

export interface LayoutConfig {
  /**
   * clipped, moves the header over the top of the navigation drawer
   * unclipped makes navigation full height
   * @default false
   */
  clipped: boolean | ScreenProps<boolean>
  /**
   * Can the navigation be collapsed to a smaller form
   * @default true
   */
  collapsible: boolean | ScreenProps<boolean>
  /**
   * Width of the collapsed navigation
   * @default 64
   */
  collapsedWidth: number | ScreenProps<number>
  /**
   * Footer to adjust the size to fit when nav expanded,
   * set false to keep the same width and overflow the screen.
   * @default true
   */
  footerShrink: boolean | ScreenProps<boolean>
  /**
   * Which side of the screen to show the nav panel
   * @default left
   */
  navAnchor: Orientation | ScreenProps<Orientation>
  /**
   * Navigation variant:
   * - permanent: stays all the time
   * - persistent: remains open but can be hidden with button
   * - temporary: hides on click away (and selection)
   * @default permanent
   */
  navVariant: Variant | ScreenProps<Variant>
  /**
   * Width of the navigation drawer
   * @default 256
   */
  navWidth: number | ScreenProps<number>
  /**
   * Position applied to the AppBar header
   * one of 'static', 'relative', 'sticky', 'fixed', 'absolute'
   * See https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning
   * @default relative
   */
  headerPosition: Position | ScreenProps<Position>
  /**
   * Both header and content adjust the size to fit when nav expanded,
   * set false to keep the same width and overflow the screen.
   * @default true
   */
  squeezed: boolean | ScreenProps<boolean>
}
