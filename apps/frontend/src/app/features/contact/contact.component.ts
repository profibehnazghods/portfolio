import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

type SocialLink = {
  label: string;
  icon: string;
  url: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly socials: SocialLink[] = [
    { label: 'GitHub', icon: 'code', url: 'https://github.com/profibehnazghods' },
    { label: 'LinkedIn', icon: 'person', url: 'https://www.linkedin.com' },
    { label: 'Email', icon: 'mail', url: 'mailto:your.email@example.com' },
  ];

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  constructor(private fb: FormBuilder, private snack: MatSnackBar) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snack.open('Please fix the form errors.', 'OK', { duration: 2500 });
      return;
    }

    // For now: frontend-only demo. Later we will send to NestJS API.
    this.snack.open('Message prepared! (API integration comes next)', 'OK', { duration: 2500 });
    this.form.reset();
  }

  hasError(controlName: 'name' | 'email' | 'message', error: string): boolean {
    const ctrl = this.form.get(controlName);
    return !!ctrl && ctrl.touched && ctrl.hasError(error);
  }
}
