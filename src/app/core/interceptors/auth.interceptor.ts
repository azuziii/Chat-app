import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService, private auth: AuthService) {}

  private isRefreshing = false;
  private refreshTokenSubject!: Observable<any>;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('skip')) return next.handle(req);

    console.log('Intercepted request to: ', req.url);

    const clone = req.clone({
      headers: req.headers.set(
        'authorization',
        'Bearer ' + this.storage.get('access_token')
      ),
    });

    return next.handle(clone).pipe(
      catchError((err) => {
        if (err.status == 401) return this.handle401(req, next, err);
        throw err;
      })
    );
  }

  handle401(
    req: HttpRequest<any>,
    next: HttpHandler,
    err: any
  ): Observable<any> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        switchMap((token) => {
          return next.handle(
            req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + token),
            })
          );
        })
      );
    }

    this.isRefreshing = true;

    this.refreshTokenSubject = this.auth.refresh().pipe(
      switchMap((access_token) => {
        console.log('Refreshed token from insterceptor');
        this.isRefreshing = false;
        return of(access_token);
      }),
      catchError(() => {
        console.log('Error refreshing token from insterceptor');
        this.auth.logout().subscribe();
        return of(null);
      })
    );

    return this.refreshTokenSubject.pipe(
      switchMap((token) => {
        console.log('Token recieved in interceptor: ', token);
        if (!token) {
          throw err;
        }

        return next.handle(
          req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token),
          })
        );
      })
    );
  }
}
