import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-display',
  imports: [],
  template: `
    <span class="badge bg-secondary">
    @for (_ of starsArray(); track $index) {⭐️}
    {{ value() }}
    </span>
  `,
  styleUrl: './rating-display.component.scss'
})
export class RatingDisplayComponent {
  readonly value = input.required<number>();
  readonly starsArray = computed(() => new Array(Math.max(this.value(), 0)));
}
