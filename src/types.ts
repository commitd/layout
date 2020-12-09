import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
export type { Breakpoint }

export type Variant = 'permanent' | 'persistent' | 'temporary'

export type Position = 'static' | 'relative' | 'sticky' | 'fixed' | 'absolute'

export type Orientation = 'left' | 'right'
/**
 *  - static: does not move for the navigation drawer, which sits on top
 *  - squeezed: size is reduced to allow for the navigation draw
 *  - pushed: the size remains the same but is moved over to allow for the drawer.
 */
export type Response = 'static' | 'squeezed' | 'pushed'
/**
 *  - clipped: moves the header over the top of the navigation drawer
 */
export type HeaderResponse = 'clipped' | Response

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
   * Is the layout contained inside some other component.
   */
  contained: boolean
  /**
   * In which breakpoint range is the screen currently
   */
  screen: Breakpoint
  /**
   * Current nav width
   */
  currentNavWidth: number
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
   * Can the navigation be collapsed to a smaller form
   * @default true
   */
  collapsible: boolean
  /**
   * Width of the collapsed navigation (px)
   * @default 64
   */
  collapsedWidth: number
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
   * Width of the navigation drawer (px)
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
   * How should the header and content adjust the size and position to fit when nav expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer.
   *  - clipped: moves the header over the top of the navigation drawer
   *
   * @default squeezed
   */
  headerResponse: HeaderResponse
  /**
   * How should the header and content adjust the size and position to fit when nav expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer.
   *
   * @default squeezed
   */
  contentResponse: Response
  /**
   * How should the Footer adjust its size and position when nav expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer.
   *
   * @default squeezed
   */
  footerResponse: Response
}

export interface LayoutConfig {
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
   * How should the Header adjust its size and position when navigation expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer.
   *  - clipped: moves the header over the top of the navigation drawer, only effective for navAnchor `left`
   *
   * @default squeezed
   */
  headerResponse: HeaderResponse | ScreenProps<HeaderResponse>
  /**
   * How should the Content adjust its size and position when navigation expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer, only effective for navAnchor `left`
   *
   * @default squeezed
   */
  contentResponse: Response | ScreenProps<Response>
  /**
   * How should the Footer adjust its size and position when navigation expanded
   *
   *  - static: does not move for the navigation drawer, which sits on top
   *  - squeezed: size is reduced to allow for the navigation draw
   *  - pushed: the size remains the same but is moved over to allow for the drawer, only effective for navAnchor `left`
   *
   * @default squeezed
   */
  footerResponse: Response | ScreenProps<Response>
}
