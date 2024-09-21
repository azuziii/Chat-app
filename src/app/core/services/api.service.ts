import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  API_URL = 'http://localhost:3000/';

  get(endpoint = '', options?: {}): Observable<any> {
    return this.http.get(this.API_URL + endpoint, {
      ...options,
      withCredentials: true,
    });
  }

  post(endpoint = '', body: any = {}, options?: {}) {
    return this.http.post(this.API_URL + endpoint, body, {
      ...options,
      withCredentials: true,
    });
  }
}
