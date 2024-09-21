import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  API_URL = 'http://localhost:3000/';

  get(endpoint = ''): Observable<any> {
    return this.http.get(this.API_URL + endpoint, {
      withCredentials: true,
    });
  }

  post(endpoint = '', body: any = {}) {
    return this.http.post(this.API_URL + endpoint, body, {
      withCredentials: true,
    });
  }
}
