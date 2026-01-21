import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('medium');
  public iconName = input<string | null>(null);
  public label = input<string>('');
  public type = input<'button' | 'submit' | 'reset'>('button');
  public disabled = input<boolean>(false);
  public loading = input<boolean>(false);
  public additionalClass = input<string>('');

  public clicked = output<void>();

  onClick() {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }

  get classes(): string {
    const baseClass = `app-button ${this.variant()} ${this.size()}`;
    const loadingClass = this.loading() ? 'loading' : '';
    const additional = this.additionalClass();
    return [baseClass, loadingClass, additional].filter(Boolean).join(' ');
  }
}
