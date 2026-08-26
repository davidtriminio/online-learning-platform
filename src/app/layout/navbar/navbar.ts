import { Component, inject } from '@angular/core'
import { AuthStore } from '../../features/auth/application/auth.store'
import { ThemeToggle } from '../../shared/ui/theme-toggle/theme-toggle'
import { LucideBookOpen, LucideGraduationCap, LucideHeart, LucideLogOut, LucideMenu, LucideVideo } from '@lucide/angular'
import { RouterLink, RouterLinkActive } from '@angular/router'

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
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly auth = inject(AuthStore)

  protected logout(): void {
    this.auth.logout()
  }
}
