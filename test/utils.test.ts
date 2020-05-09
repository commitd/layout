import { Layout } from '../src/types'
import { defaultContext, getNavWidth, getScreenValue } from '../src/utils'

const initialContext = defaultContext()

describe('getNavWidth', () => {
  describe('variant permanent', () => {
    let config: Omit<Layout, 'currentNavWidth'>

    beforeEach(() => {
      config = Object.assign({}, initialContext, {
        navVariant: 'permanent',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      config.collapsed = false
      config.open = true
      expect(getNavWidth(config)).toBe(initialContext.navWidth)
    })

    it('returns navWidth when not collapsed and closed', () => {
      config.collapsed = false
      config.open = false
      expect(getNavWidth(config)).toBe(initialContext.navWidth)
    })

    it('returns collapsedWidth when collapsed and open', () => {
      config.collapsed = true
      config.open = true
      expect(getNavWidth(config)).toBe(initialContext.collapsedWidth)
    })

    it('returns collapsedWidth when collapsed and closed', () => {
      config.collapsed = true
      config.open = false
      expect(getNavWidth(config)).toBe(initialContext.collapsedWidth)
    })
  })

  describe('variant persistent', () => {
    let config: Omit<Layout, 'currentNavWidth'>

    beforeEach(() => {
      config = Object.assign({}, initialContext, {
        navVariant: 'persistent',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      config.collapsed = false
      config.open = true
      expect(getNavWidth(config)).toBe(initialContext.navWidth)
    })

    it('returns 0 when not collapsed and closed', () => {
      config.collapsed = false
      config.open = false
      expect(getNavWidth(config)).toBe(0)
    })

    it('returns collapsedWidth when collapsed and open', () => {
      config.collapsed = true
      config.open = true
      expect(getNavWidth(config)).toBe(initialContext.collapsedWidth)
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
      config = Object.assign({}, initialContext, {
        navVariant: 'temporary',
      })
    })

    it('returns navWidth when not collapsed and open', () => {
      config.collapsed = false
      config.open = true
      expect(getNavWidth(config)).toBe(initialContext.navWidth)
    })

    it('returns 0 when not collapsed and closed', () => {
      config.collapsed = false
      config.open = false
      expect(getNavWidth(config)).toBe(0)
    })

    it('returns collapsedWidth when collapsed and open', () => {
      config.collapsed = true
      config.open = true
      expect(getNavWidth(config)).toBe(initialContext.collapsedWidth)
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
})
