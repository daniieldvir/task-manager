import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-placeholder-card',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './placeholder-card.component.html',
  styleUrl: './placeholder-card.component.scss',
})
export class PlaceholderCardComponent {
  public title = input<string>('');
  public message = input<string>('');
}
