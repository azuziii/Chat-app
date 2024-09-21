import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router
  ) {}

  login(userCreds: Record<string, any>) {
    return this.api.post('login', userCreds).pipe(
      tap((response: Record<string, any>) => {
        console.log('login success');
        this.storage.set('access_token', response['access_token'] || null);
        this.router.navigate(['/']);
      })
    );
  }

  register(userCreds: Record<string, any>) {
    return this.api.post('register', userCreds).pipe(
      tap((response: Record<string, any>) => {
        console.log('register success');
        this.storage.set('access_token', response['access_token'] || null);
        this.router.navigate(['/']);
      })
    );
  }

  logout() {
    return this.api.post('auth/logout').pipe(
      tap(() => {
        console.log('logged out');
        this.storage.clear('access_token');
        this.router.navigate(['/login']);
      })
    );
  }

  refresh(): Observable<any> {
    return this.api.post('auth/refresh').pipe(
      tap((response: any) => {
        console.log(
          'Recieved access token in refresh method: ',
          response.access_token
        );
        this.storage.set('access_token', response.access_token);
      }),
      map((response: any) => response.access_token)
    );
  }
}
