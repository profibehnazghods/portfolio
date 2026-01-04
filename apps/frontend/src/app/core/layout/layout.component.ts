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
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ThemeService } from '../theme/theme.service';

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
    FooterComponent
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
  private readonly theme = inject(ThemeService);

  /** Plain boolean for template icon switching (pipes are NOT allowed in actions). */
  isDark = false;
  
  toggleTheme(): void {
    this.theme.toggle();
  }
  
  constructor() {
    // init theme once
    this.theme.init();
  
    this.theme.isDark$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.isDark = val));
  
    this.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => (this.isMobile = val));
  }
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
