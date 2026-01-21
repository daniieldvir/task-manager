import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton-loader',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skeleton-loader.component.html',
    styleUrl: './skeleton-loader.component.scss',
})
export class SkeletonLoaderComponent {
    public width = input<string>('100%');
    public height = input<string>('1rem');
    public borderRadius = input<string>('0.5rem');
    public count = input<number>(1);

    get items() {
        return Array(this.count()).fill(0);
    }
}
