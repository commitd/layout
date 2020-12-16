import { Layout } from '../src/types'
import {
  createNewContext,
  defaultContext,
  getNavWidth,
  getScreenValue,
} from '../src/utils'

describe('createNewContext', () => {
  describe('Can create new context', () => {
    const setOpen = jest.fn()
    const setCollapsed = jest.fn()
    const open = true
    const collapsed = false
    const context = createNewContext(
      {},
      'sm',
      open,
      collapsed,
      setOpen,
      setCollapsed,
      false
    )
    expect(context).toMatchInlineSnapshot(`
      Object {
        "collapsed": false,
        "collapsedWidth": 64,
        "collapsible": true,
        "contained": false,
        "contentResponse": "squeezed",
        "footerResponse": "squeezed",
        "headerPosition": "relative",
        "headerResponse": "squeezed",
        "navAnchor": "left",
        "navVariant": "permanent",
        "navWidth": 256,
        "open": true,
        "screen": "sm",
        "setCollapsed": [Function],
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
    expect(defaultContext.setOpen).toBeTruthy()
    expect(defaultContext.setCollapsed).toBeTruthy()
    expect(defaultContext.setOpen(true)).toBeFalsy()
    expect(defaultContext.setCollapsed(false)).toBeFalsy()
  })
})

describe('getNavWidth', () => {
  describe('variant permanent', () => {
    let config: Omit<Layout, 'currentNavWidth'>

    beforeEach(() => {
      config = Object.assign({}, defaultContext, {
        navVariant: 'permanent',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      config.collapsed = false
      config.open = true
      expect(getNavWidth(config)).toBe(defaultContext.navWidth)
    })

    it('returns navWidth when not collapsed and closed', () => {
      config.collapsed = false
      config.open = false
      expect(getNavWidth(config)).toBe(defaultContext.navWidth)
    })

    it('returns collapsedWidth when collapsed and open', () => {
      config.collapsed = true
      config.open = true
      expect(getNavWidth(config)).toBe(defaultContext.collapsedWidth)
    })

    it('returns collapsedWidth when collapsed and closed', () => {
      config.collapsed = true
      config.open = false
      expect(getNavWidth(config)).toBe(defaultContext.collapsedWidth)
    })
  })

  describe('variant persistent', () => {
    let config: Omit<Layout, 'currentNavWidth'>

    beforeEach(() => {
      config = Object.assign({}, defaultContext, {
        navVariant: 'persistent',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      config.collapsed = false
      config.open = true
      expect(getNavWidth(config)).toBe(defaultContext.navWidth)
    })

    it('returns 0 when not collapsed and closed', () => {
      config.collapsed = false
      config.open = false
      expect(getNavWidth(config)).toBe(0)
    })

    it('returns collapsedWidth when collapsed and open', () => {
      config.collapsed = true
      config.open = true
      expect(getNavWidth(config)).toBe(defaultContext.collapsedWidth)
    })

    it('returns 0 when collapsed and closed', () => {
      config.collapsed = true
      config.open = false
      expect(getNavWidth(config)).toBe(0)
    })
  })

  describe('variant temporary', () => {
    let config: Omit<Layout, 'currentNavWidth'>

    beforeEach(() => {
      config = Object.assign({}, defaultContext, {
        navVariant: 'temporary',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      config.collapsed = false
      config.open = true
      expect(getNavWidth(config)).toBe(defaultContext.navWidth)
    })

    it('returns 0 when not collapsed and closed', () => {
      config.collapsed = false
      config.open = false
      expect(getNavWidth(config)).toBe(0)
    })

    it('returns collapsedWidth when collapsed and open', () => {
      config.collapsed = true
      config.open = true
      expect(getNavWidth(config)).toBe(defaultContext.collapsedWidth)
    })

    it('returns 0 when collapsed and closed', () => {
      config.collapsed = true
      config.open = false
      expect(getNavWidth(config)).toBe(0)
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
    ).toThrowErrorMatchingInlineSnapshot(`"Config not valid"`)
  })
})
