import { CurrentLayoutConfig } from '../src/types'
import {
  createNewContext,
  getNavWidth,
  getScreenValue,
  LAYOUT_CONFIG_DEFAULTS,
  LAYOUT_DEFAULTS,
} from '../src/utils'

describe('createNewContext', () => {
  describe('Can create new context', () => {
    const setCollapsed = jest.fn()
    const setDragged = jest.fn()
    const setNavWidth = jest.fn()
    const setOpen = jest.fn()
    const open = true
    const collapsed = false
    const dragged = false
    const contained = false
    const width = 'sm'
    const overrideNavWidth = 300
    const context = createNewContext(
      collapsed,
      {},
      contained,
      dragged,
      open,
      overrideNavWidth,
      width,
      setCollapsed,
      setDragged,
      setNavWidth,
      setOpen
    )
    expect(context).toMatchInlineSnapshot(`
      Object {
        "collapsed": false,
        "collapsedWidth": 64,
        "collapsible": true,
        "contained": false,
        "contentResponse": "squeezed",
        "draggable": false,
        "dragged": false,
        "footerResponse": "squeezed",
        "headerPosition": "relative",
        "headerResponse": "squeezed",
        "maxNavWidth": 512,
        "navAnchor": "left",
        "navVariant": "permanent",
        "navWidth": 300,
        "open": true,
        "screen": "sm",
        "setCollapsed": [Function],
        "setDragged": [MockFunction],
        "setNavWidth": [Function],
        "setOpen": [Function],
      }
    `)

    context.setOpen(false)
    expect(setOpen).toHaveBeenLastCalledWith(false)
    context.setOpen(true)
    expect(setOpen).toHaveBeenLastCalledWith(true)
    context.setOpen({})
    expect(setOpen).toHaveBeenLastCalledWith(!open)
    expect(setOpen).toBeCalledTimes(3)

    context.setCollapsed(false)
    expect(setCollapsed).toHaveBeenLastCalledWith(false)
    context.setCollapsed(true)
    expect(setCollapsed).toHaveBeenLastCalledWith(true)
    context.setCollapsed({})
    expect(setCollapsed).toHaveBeenLastCalledWith(!collapsed)
    expect(setCollapsed).toBeCalledTimes(3)
  })

  describe('for coverage', () => {
    expect(LAYOUT_DEFAULTS.setOpen).toBeTruthy()
    expect(LAYOUT_DEFAULTS.setCollapsed).toBeTruthy()
    expect(LAYOUT_DEFAULTS.setOpen(true)).toBeFalsy()
    expect(LAYOUT_DEFAULTS.setCollapsed(false)).toBeFalsy()
  })
})

describe('getNavWidth', () => {
  describe('variant permanent', () => {
    let config: CurrentLayoutConfig

    beforeEach(() => {
      config = Object.assign({}, LAYOUT_CONFIG_DEFAULTS, {
        navVariant: 'permanent',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      const collapsed = false
      const open = true
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.navWidth
      )
    })

    it('returns overrideNavWidth when not collapsed, open and overridden', () => {
      const collapsed = false
      const open = true
      const overrideNavWidth = 500
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        overrideNavWidth
      )
    })

    it('returns navWidth when not collapsed and closed', () => {
      const collapsed = false
      const open = false
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.navWidth
      )
    })

    it('returns collapsedWidth when collapsed and open', () => {
      const collapsed = true
      const open = true
      const overrideNavWidth = 100
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.collapsedWidth
      )
    })

    it('returns collapsedWidth when collapsed and closed', () => {
      const collapsed = true
      const open = false
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.collapsedWidth
      )
    })
  })

  describe('variant persistent', () => {
    let config: CurrentLayoutConfig

    beforeEach(() => {
      config = Object.assign({}, LAYOUT_CONFIG_DEFAULTS, {
        navVariant: 'persistent',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      const collapsed = false
      const open = true
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.navWidth
      )
    })

    it('returns 0 when not collapsed and closed', () => {
      const collapsed = false
      const open = false
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(0)
    })

    it('returns collapsedWidth when collapsed and open', () => {
      const collapsed = true
      const open = true
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.collapsedWidth
      )
    })

    it('returns 0 when collapsed and closed', () => {
      const collapsed = true
      const open = false
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(0)
    })
  })

  describe('variant temporary', () => {
    let config: CurrentLayoutConfig

    beforeEach(() => {
      config = Object.assign({}, LAYOUT_CONFIG_DEFAULTS, {
        navVariant: 'temporary',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      const collapsed = false
      const open = true
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.navWidth
      )
    })

    it('returns overrideNavWidth when not collapsed and open and override set', () => {
      const collapsed = false
      const open = true
      const overrideNavWidth = 400
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        overrideNavWidth
      )
    })

    it('returns max if override too high', () => {
      const collapsed = false
      const open = true
      const overrideNavWidth = 600
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.maxNavWidth
      )
    })

    it('returns collapsedWidth if override too low', () => {
      const collapsed = false
      const open = true
      const overrideNavWidth = 1
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.collapsedWidth
      )
    })

    it('returns 0 when not collapsed and closed', () => {
      const collapsed = false
      const open = false
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(0)
    })

    it('returns collapsedWidth when collapsed and open', () => {
      const collapsed = true
      const open = true
      const overrideNavWidth = null
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(
        LAYOUT_CONFIG_DEFAULTS.collapsedWidth
      )
    })

    it('returns 0 when collapsed and closed', () => {
      const collapsed = true
      const open = false
      const overrideNavWidth = 100
      expect(getNavWidth(config, collapsed, open, overrideNavWidth)).toBe(0)
    })
  })
})

describe('getScreenValue', () => {
  it('returns default when not defined', () => {
    const defaultValue = 10
    expect(getScreenValue('xs', undefined, defaultValue)).toBe(defaultValue)
    expect(getScreenValue('sm', undefined, defaultValue)).toBe(defaultValue)
    expect(getScreenValue('md', undefined, defaultValue)).toBe(defaultValue)
    expect(getScreenValue('lg', undefined, defaultValue)).toBe(defaultValue)
    expect(getScreenValue('xl', undefined, defaultValue)).toBe(defaultValue)
  })

  it('returns given value when single', () => {
    const defaultValue = 'test'
    const value = 'value'
    expect(getScreenValue('xs', value, defaultValue)).toBe(value)
    expect(getScreenValue('sm', value, defaultValue)).toBe(value)
    expect(getScreenValue('md', value, defaultValue)).toBe(value)
    expect(getScreenValue('lg', value, defaultValue)).toBe(value)
    expect(getScreenValue('xl', value, defaultValue)).toBe(value)
  })

  it('returns relevant breakpoint if present', () => {
    const defaultValue = 0
    const value = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    }
    expect(getScreenValue('xs', value, defaultValue)).toBe(value.xs)
    expect(getScreenValue('sm', value, defaultValue)).toBe(value.sm)
    expect(getScreenValue('md', value, defaultValue)).toBe(value.md)
    expect(getScreenValue('lg', value, defaultValue)).toBe(value.lg)
    expect(getScreenValue('xl', value, defaultValue)).toBe(value.xl)
  })

  it('returns nearest breakpoint if not present', () => {
    const defaultValue = 0
    const value = {
      md: 3,
      lg: 4,
    }
    expect(getScreenValue('xs', value, defaultValue)).toBe(value.md)
    expect(getScreenValue('sm', value, defaultValue)).toBe(value.md)
    expect(getScreenValue('md', value, defaultValue)).toBe(value.md)
    expect(getScreenValue('lg', value, defaultValue)).toBe(value.lg)
    expect(getScreenValue('xl', value, defaultValue)).toBe(value.lg)
  })

  it('returns nearest breakpoint if not present', () => {
    const defaultValue = 'x'
    const value = {
      sm: 'a',
      md: 'b',
      lg: 'c',
    }
    expect(getScreenValue('xs', value, defaultValue)).toBe(value.sm)
    expect(getScreenValue('sm', value, defaultValue)).toBe(value.sm)
    expect(getScreenValue('md', value, defaultValue)).toBe(value.md)
    expect(getScreenValue('lg', value, defaultValue)).toBe(value.lg)
    expect(getScreenValue('xl', value, defaultValue)).toBe(value.lg)
  })

  it('throw is input not valid', () => {
    const defaultValue = '@£F'
    const value = {
      aa: 'a',
    }
    expect(() =>
      // @ts-expect-error
      getScreenValue('bb', value, defaultValue)
    ).toThrowErrorMatchingInlineSnapshot(
      `"Config not valid bb: {\\"aa\\":\\"a\\"}, \\"@£F\\""`
    )
  })
})
