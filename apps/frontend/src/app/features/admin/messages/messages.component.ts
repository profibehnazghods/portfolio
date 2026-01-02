import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


// Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminApiService, ContactMessage } from '../../../shared/api/admin-api.service';


@Component({
  selector: 'app-admin-messages',
  standalone: true,
  imports: [
    CommonModule,

    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    FormsModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  private readonly api = inject(AdminApiService);
  private readonly router = inject(Router);

  loading = false;
  error: string | null = null;

  all: ContactMessage[] = [];
  filtered: ContactMessage[] = [];

  displayedColumns: string[] = ['createdAt', 'name', 'email', 'message'];

  search = '';

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;

    this.api.getMessages().subscribe({
      next: (res) => {
        // جدیدترین بالا
        this.all = [...res].sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
        this.applyFilter();
        this.loading = false;
      },
      error: (err: unknown) => {
        const httpErr = err as HttpErrorResponse;
        const msg = (httpErr.error as any)?.message;
        this.error = Array.isArray(msg) ? msg[0] : (msg ?? 'Failed to load messages');
      },
    });
  }

  applyFilter(): void {
    const q = this.search.trim().toLowerCase();
    if (!q) {
      this.filtered = this.all;
      return;
    }

    this.filtered = this.all.filter((m) => {
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    });
  }

  logout(): void {
    this.api.logout();
    this.router.navigateByUrl('/admin/login');
  }

  trackById(_: number, item: ContactMessage) {
    return item.id;
  }
}
