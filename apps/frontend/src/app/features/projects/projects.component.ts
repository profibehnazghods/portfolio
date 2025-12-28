import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Project, ProjectTag } from '../../shared/models/project.model';

type TagOption = { label: string; value: ProjectTag | 'All' };

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly tagOptions: TagOption[] = [
    { label: 'All', value: 'All' },
    { label: 'Angular', value: 'Angular' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'Material', value: 'Material' },
    { label: 'NestJS', value: 'NestJS' },
    { label: 'Docker', value: 'Docker' },
  ];

  selectedTag: TagOption['value'] = 'All';

  readonly projects: Project[] = [
    {
      title: 'Portfolio Monorepo',
      description: 'Angular standalone + Material UI with a NestJS backend. Clean structure and reusable components.',
      tags: ['Angular', 'TypeScript', 'Material', 'NestJS', 'Node'],
      highlights: [
        'Feature-based structure (core/features/shared)',
        'Responsive layout (Toolbar + Sidenav)',
        'Typed models and clean code conventions',
      ],
      links: [
        { label: 'GitHub', url: 'https://github.com/profibehnazghods/portfolio' },
      ],
    },
    {
      title: 'Dashboard UI (Sample)',
      description: 'A modern admin dashboard concept with charts, cards, and responsive grid.',
      tags: ['Angular', 'TypeScript', 'Material', 'RxJS'],
      highlights: ['Reusable UI components', 'Responsive grid system', 'UX-focused layout'],
    },
    {
      title: 'NestJS REST API (Sample)',
      description: 'REST API with validation-ready DTO structure and clear controller/service separation.',
      tags: ['NestJS', 'Node', 'TypeScript'],
      highlights: ['Clean controllers/services', 'Prepared for validation + Swagger', 'Environment-based config'],
    },
  ];

  get filteredProjects(): Project[] {
    if (this.selectedTag === 'All') {
      return this.projects;
    }
  
    const tag = this.selectedTag as ProjectTag;
    return this.projects.filter((p) => p.tags.includes(tag));
  }  

  trackByTitle(_index: number, item: Project): string {
    return item.title;
  }
}
