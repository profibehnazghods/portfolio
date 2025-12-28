import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly skills = ['Angular', 'TypeScript', 'RxJS', 'Angular Material', 'NestJS', 'REST APIs'];

  readonly highlights = [
    { title: 'Clean Code & Architecture', desc: 'Maintainable structure with feature-based modules and typed models.' },
    { title: 'Responsive UI', desc: 'Mobile-first layouts with Material components and consistent spacing.' },
    { title: 'Backend-ready', desc: 'NestJS API integration plan + DTOs + validation.' },
  ];
}
