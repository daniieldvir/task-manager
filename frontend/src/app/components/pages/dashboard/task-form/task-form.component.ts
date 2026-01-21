import { Component, effect, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskFormData } from '../../../../models/task.models';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ButtonComponent } from '../../../shared/button/button.component';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, ButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  public titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');

  public isOpen = input<boolean>(false);
  public title = input<string>('');
  public task = input<Task | null>(null);

  public closed = output<void>();
  public confirmed = output<TaskFormData>();

  public error = signal<string>('');

  private readonly fb = inject(FormBuilder);

  public form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const input = this.titleInput();
      if (this.isOpen() && input) {
        setTimeout(() => input.nativeElement.focus(), 0);
      }
    });

    effect(() => {
      const task = this.task();
      if (task) {
        this.form.patchValue({
          title: task.title,
          description: task.description || '',
        });
      } else {
        this.form.reset();
      }

      this.error.set('');
    });
  }


  confirm() {
    if (this.form.invalid) {
      this.error.set('Fields are required');
      return;
    }

    const taskData: TaskFormData = {
      title: this.form.value.title ?? '',
      description: this.form.value.description ?? '',
    };

    if (this.task()) {
      taskData.id = this.task()!.id;
    }

    this.confirmed.emit(taskData);
  }

  close() {
    this.form.reset();
    this.error.set('');
    this.closed.emit();
  }
}