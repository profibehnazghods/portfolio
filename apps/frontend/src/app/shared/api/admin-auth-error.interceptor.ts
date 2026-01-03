import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AdminApiService } from './admin-api.service';

export const adminAuthErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(AdminApiService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: unknown) => {
      const httpErr = err as HttpErrorResponse;

      if (req.url.startsWith('/api/admin') && httpErr.status === 401) {
        api.logout();
        router.navigateByUrl('/admin/login');
      }

      return throwError(() => err);
    })
  );
};
