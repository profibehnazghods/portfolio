import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AdminApiService } from './admin-api.service';

export const adminTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(AdminApiService);
  const router = inject(Router);

  const token = api.getToken();
  const isAdminCall = req.url.startsWith('/api/admin');

  if (token && isAdminCall) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        if (isAdminCall && (err.status === 401 || err.status === 403)) {
          api.logout();

          router.navigateByUrl('/admin/login');
        }
      }

      return throwError(() => err);
    })
  );
};
