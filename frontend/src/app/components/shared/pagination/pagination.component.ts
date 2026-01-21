import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  public currentPage = input<number>(0);
  public totalCount = input<number>(0);
  public pageSize = input<number>(20);

  public pageChange = output<number>();

  public totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));

  public pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    // Show max 5 page numbers
    let start = Math.max(0, current - 2);
    let end = Math.min(total - 1, start + 4);

    if (end - start < 4) {
      start = Math.max(0, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });

  onPageClick(page: number) {
    if (page !== this.currentPage() && page >= 0 && page < this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
