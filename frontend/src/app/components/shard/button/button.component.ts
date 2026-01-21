import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public variant = input<ButtonVariant>('primary');
  public iconName = input<string | null>(null);
  public label = input<string>('');
  public type = input<'button' | 'submit' | 'reset'>('button');
  public disabled = input<boolean>(false);
  public additionalClass = input<string>('');

  public clicked = output<void>();

  onClick() {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }

  get classes(): string {
    const baseClass = `app-button ${this.variant()}`;
    const additional = this.additionalClass();
    return additional ? `${baseClass} ${additional}` : baseClass;
  }
}
