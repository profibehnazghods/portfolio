import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { adminAuthGuard } from './shared/guards/admin-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },

      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/projects.component').then(
            (m) => m.ProjectsComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about.component').then(
            (m) => m.AboutComponent
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
    ],
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'admin/messages',
    loadComponent: () =>
      import('./features/admin/messages/messages.component').then(
        (m) => m.MessagesComponent
      ),
  },
  { path: '**', redirectTo: 'home' },
];
