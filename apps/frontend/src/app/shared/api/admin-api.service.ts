import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type AdminLoginResponse = { accessToken: string };

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly tokenKey = 'admin_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AdminLoginResponse>('/api/admin/auth/login', { email, password })
      .pipe(tap((res) => localStorage.setItem(this.tokenKey, res.accessToken)));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getMessages() {
    return this.http.get<ContactMessage[]>('/api/admin/messages');
  }
}
