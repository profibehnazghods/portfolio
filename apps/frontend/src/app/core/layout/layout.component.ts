import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, map, shareReplay, takeUntil } from 'rxjs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

type NavItem = {
  label: string;
  path: string;
  icon: string;
};

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgFor,
    AsyncPipe,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnDestroy {
  private readonly breakpoints = inject(BreakpointObserver);
  private readonly destroy$ = new Subject<void>();

  /** Observable for template bindings (allowed to use async pipe in bindings). */
  readonly isMobile$ = this.breakpoints.observe(['(max-width: 768px)']).pipe(
    map((state) => state.matches),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /** Plain boolean for click handlers (pipes are NOT allowed in actions). */
  isMobile = false;

  readonly navItems: NavItem[] = [
    { label: 'Home', path: '/home', icon: 'home' },
    { label: 'Projects', path: '/projects', icon: 'work' },
    { label: 'About', path: '/about', icon: 'person' },
    { label: 'Contact', path: '/contact', icon: 'mail' },
  ];

  constructor() {
    this.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.isMobile = val));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
