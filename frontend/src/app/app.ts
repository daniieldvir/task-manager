import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    console.log('App initialized');
    // Theme service initializes automatically via constructor
  }
}
