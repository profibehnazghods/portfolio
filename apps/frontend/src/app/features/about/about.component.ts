import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

type TimelineItem = {
  title: string;
  period: string;
  description: string;
  tags?: string[];
};

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly quickFacts = [
    { icon: 'location_on', label: 'Based in', value: 'Germany' },
    { icon: 'code', label: 'Focus', value: 'Angular + UI Engineering' },
    { icon: 'layers', label: 'Style', value: 'Clean Architecture, Typed Models' },
  ];

  readonly strengths = ['Clean Code', 'Responsive UI', 'Angular Standalone', 'TypeScript', 'Team Collaboration'];

  readonly timeline: TimelineItem[] = [
    {
      title: 'Frontend Developer (Angular)',
      period: '2023 — Present',
      description:
        'Building scalable UI features with Angular, focusing on maintainability, performance, and great UX.',
      tags: ['Angular', 'TypeScript', 'RxJS', 'Material'],
    },
    {
      title: 'UI/UX & Component Systems',
      period: '2022 — 2023',
      description:
        'Created reusable UI components, improved design consistency, and developed responsive layouts for web apps.',
      tags: ['Design Systems', 'Accessibility', 'Responsive'],
    },
    {
      title: 'Full-stack Collaboration',
      period: '2021 — 2022',
      description:
        'Worked closely with backend teams to define APIs, DTOs, and validation rules to ship features smoothly.',
      tags: ['REST APIs', 'NestJS', 'Teamwork'],
    },
  ];
}