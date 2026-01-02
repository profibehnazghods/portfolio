import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AdminApiService } from '../api/admin-api.service';

export const adminAuthGuard: CanActivateFn = () => {
  const api = inject(AdminApiService);
  const router = inject(Router);

  if (api.getToken()) return true;

  router.navigateByUrl('/admin/login');
  return false;
};
