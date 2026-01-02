import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AdminApiService } from './admin-api.service';

export const adminTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(AdminApiService);
  const token = api.getToken();

  // فقط برای روت‌های ادمین
  if (token && req.url.startsWith('/api/admin')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};
