import { expect, beforeEach } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { ThemeService } from './theme.service'

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    TestBed.configureTestingModule({})
  })

  it('defaults to system when nothing is saved', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('system')
  })

  it('reads the initial theme from storage', () => {
    localStorage.setItem('app-theme', 'dark')
    expect(TestBed.inject(ThemeService).theme()).toBe('dark')
  })

  it('cycles light -> dark -> system -> light', () => {
    const s = TestBed.inject(ThemeService)
    s.set('light')
    s.cycle()
    expect(s.theme()).toBe('dark')
    s.cycle()
    expect(s.theme()).toBe('system')
    s.cycle()
    expect(s.theme()).toBe('light')
  })

  it('isDark reflects explicit theme (system falls back to false in jsdom)', () => {
    const s = TestBed.inject(ThemeService)
    s.set('dark')
    expect(s.isDark()).toBe(true)
    s.set('light')
    expect(s.isDark()).toBe(false)
    s.set('system')
    expect(s.isDark()).toBe(false) // jsdom no matchMedia
  })

  it('effect toggles the .dark class and persists the theme', () => {
    const s = TestBed.inject(ThemeService)
    s.set('dark')
    TestBed.tick()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('app-theme')).toBe('dark')
  })
})
