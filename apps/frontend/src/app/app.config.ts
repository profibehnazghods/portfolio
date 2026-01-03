import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { adminTokenInterceptor } from './shared/api/admin-token.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { adminAuthErrorInterceptor } from './shared/api/admin-auth-error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),provideHttpClient(withInterceptors([adminTokenInterceptor,adminAuthErrorInterceptor]))]
};
