import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AdminApiService } from './admin-api.service';

export const adminAuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/admin')) {
    return next(req);
  }

  const router = inject(Router);
  const snack = inject(MatSnackBar);
  const api = inject(AdminApiService);

  return next(req).pipe(
    catchError((err: unknown) => {
      const httpErr = err as HttpErrorResponse;

      if (httpErr?.status === 401) {
        api.logout();

        snack.open('your session is expired  ', 'ok', {
          duration: 3500,
          verticalPosition: 'top',
        });

        router.navigateByUrl('/admin/login');
      }

      return throwError(() => err);
    })
  );
};
