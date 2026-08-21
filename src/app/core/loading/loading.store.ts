import { computed, signal } from '@angular/core'

export class LoadingStore {
  private _count = signal(0)
  readonly isLoading = computed(() => this._count() > 0)
  start(): void {
    this._count.update((n) => n + 1)
  }
  stop(): void {
    this._count.update((n) => Math.max(0, n - 1))
  }
}
