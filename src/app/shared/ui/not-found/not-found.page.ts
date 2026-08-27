import { Component } from '@angular/core'
import { LucideArrowLeft, LucideCompass, LucideGraduationCap } from '@lucide/angular'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-not-found',
  imports: [LucideCompass, LucideGraduationCap, LucideArrowLeft, RouterLink],
  templateUrl: './not-found.page.html',
})
export class NotFoundPage {}
