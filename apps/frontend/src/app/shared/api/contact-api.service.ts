import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

@Injectable({ providedIn: 'root' })
export class ContactApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  send(payload: ContactPayload): Observable<unknown> {
    return this.http.post(`/api/contact`, payload);
  }
}
