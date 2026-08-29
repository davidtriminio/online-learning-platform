import { expect, beforeEach, vi } from 'vitest'
import { TestBed } from '@angular/core/testing'
import { Location } from '@angular/common'
import { Router } from '@angular/router'
import { BackDirective } from './back.directive'

describe('BackDirective', () => {
  const location = { back: vi.fn() }
  const router = { navigate: vi.fn() }
  let dir: BackDirective

  beforeEach(() => {
    vi.clearAllMocks()
    TestBed.configureTestingModule({
      providers: [
        BackDirective,
        { provide: Location, useValue: location },
        { provide: Router, useValue: router },
      ],
    })
    dir = TestBed.inject(BackDirective)
  })

  it('goes back when history has entries', () => {
    vi.spyOn(window.history, 'length', 'get').mockReturnValue(2)
    dir.goBack()
    expect(location.back).toHaveBeenCalled()
    expect(router.navigate).not.toHaveBeenCalled()
  })

  it('navigates to the fallback when there is no history', () => {
    vi.spyOn(window.history, 'length', 'get').mockReturnValue(1)
    dir.goBack()
    expect(router.navigate).toHaveBeenCalledWith(['/']) // default appBack
    expect(location.back).not.toHaveBeenCalled()
  })
})
