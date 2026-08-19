import { Component } from '@angular/core';
import { LucideInbox, LucidePlus } from '@lucide/angular';

@Component({
  selector: 'app-empty-state',
  imports: [LucidePlus, LucideInbox],
  templateUrl: './empty-state.html'
})
export class EmptyState {}
