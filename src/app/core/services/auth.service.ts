import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Router, UrlTree } from '@angular/router';

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
    return this.api.post('auth/login', userCreds).pipe(
      tap((response: Record<string, any>) => {
        console.log('login success');
        this.storage.set('access_token', response['access_token'] || null);
        this.router.navigate(['/']);
      }),
      catchError((err) => {
        console.log('login fail');
        if (err.error) throw err.error.message;
        throw 'Failed to login';
      })
    );
  }

  register(userCreds: Record<string, any>) {
    return this.api.post('auth/register', userCreds).pipe(
      tap((response: Record<string, any>) => {
        console.log('register success');
        this.storage.set('access_token', response['access_token'] || null);
        this.router.navigate(['/']);
      }),
      catchError((err) => {
        console.log('register fail');
        if (err.error) throw err.error.message;
        throw 'Failed to register';
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
    return this.api
      .post('auth/refresh', {}, { headers: { skip: 'true' } })
      .pipe(
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

  isAuthenticated(): Observable<boolean | UrlTree> {
    return this.api.get('auth/check').pipe(
      map(() => {
        console.log('guard allowed route');
        return true;
      }),
      catchError((err) => {
        console.log('guard protected route, message: ', err);
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}
