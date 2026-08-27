import { Component, inject, signal } from '@angular/core'
import { AuthStore } from '../../features/auth/application/auth.store'
import { ThemeToggle } from '../../shared/ui/theme-toggle/theme-toggle'
import {
  LucideBookOpen,
  LucideGraduationCap,
  LucideHeart,
  LucideLogOut,
  LucideMenu,
  LucideVideo, LucideX,
} from '@lucide/angular'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { Button } from '../../shared/ui/button/button/button'
import { NgTemplateOutlet } from '@angular/common'

@Component({
  selector: 'app-navbar',
  imports: [
    ThemeToggle,
    LucideGraduationCap,
    LucideBookOpen,
    LucideHeart,
    LucideVideo,
    LucideLogOut,
    LucideMenu,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    LucideX,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly auth = inject(AuthStore)
  protected readonly menuOpen = signal(false)

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v)
  }

  protected closeMenu(): void {
    this.menuOpen.set(false)
  }

  protected logout(): void {
    this.closeMenu()
    this.auth.logout()
  }
}
