import { computed, inject, Injectable, signal } from '@angular/core'
import { AuthRepository } from '../infrastructure/auth.repository'
import { SessionStorageService } from '../infrastructure/session-storage-service'
import { Router } from '@angular/router'
import { AuthUser } from '../domain/auth-user.model';
import { LoginRequestDto } from '../infrastructure/dto/login-request.dto';

type Status = 'idle' | 'loading' | 'error'

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private repo = inject(AuthRepository)
  private session = inject(SessionStorageService)
  private router = inject(Router)

  private _user = signal<AuthUser | null>(null)
  private _status = signal<Status>('idle')

  readonly user = this._user.asReadonly()
  readonly status = this._status.asReadonly()
  readonly isAuthenticated = computed(() => this._user() !== null)
  readonly isAdmin = computed(() => this._user()?.role === 'Admin')

  login(credentials: LoginRequestDto): void{
    this._status.set('loading')
    this.repo.login(credentials).subscribe({
      next: ({user, token}) => {
        this.session.setToken(token)
        this._user.set(user)
        this.router.navigate(['/courses'])
      },
      error: () => this._status.set('error')
    })
  }

  logout(): void {
    this.session.clear()
    this._user.set(null)
    this.router.navigate(['/login'])
  }
}
