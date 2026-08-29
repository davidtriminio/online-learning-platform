import { expect } from 'vitest'
import { LoadingStore } from './loading.store'

describe('LoadingStore', () => {
  it('is idle initially', () => {
    expect(new LoadingStore().isLoading()).toBe(false)
  })

  it('stays loading until every request stops (counter)', () => {
    const store = new LoadingStore()
    store.start()
    store.start()
    expect(store.isLoading()).toBe(true)
    store.stop()
    expect(store.isLoading()).toBe(true) //1
    store.stop()
    expect(store.isLoading()).toBe(false)
  })

  it('never goes negative on an extra stop', () => {
    const store = new LoadingStore()
    store.stop()
    expect(store.isLoading()).toBe(false)
  })
})
