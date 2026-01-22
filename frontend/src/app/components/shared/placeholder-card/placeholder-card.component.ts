import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './placeholder-card.component.html',
  styleUrl: './placeholder-card.component.scss',
})
export class PlaceholderCardComponent {
  public title = input<string>('');
  public message = input<string>('');
}
