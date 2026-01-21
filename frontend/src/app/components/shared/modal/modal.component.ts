import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  public isOpen = input<boolean>(false);
  public title = input<string>('');
  public maxWidth = input<string>('480px');
  public height = input<string | null>(null);

  public closed = output<void>();

  get modalHeight(): string | null {
    return this.height() || null;
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  close() {
    this.closed.emit();
  }
}
