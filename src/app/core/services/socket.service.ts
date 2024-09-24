import { ApplicationRef, inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { StorageService } from './storage.service';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;
  constructor(private storage: StorageService) {
    this.socket = io('http://localhost:3002', {
      auth: (cb) => {
        cb({ token: this.storage.get('access_token') });
      },
      autoConnect: false,
    });
    inject(ApplicationRef)
      .isStable.pipe(first((isStable) => isStable))
      .subscribe(() => {
        this.socket.connect();
      });
  }

  emit(event: string, data: any = {}, cb?: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  connect() {
    this.socket.connect();
    // this.socket = io('http://localhost:3002', {
    //   autoConnect: true,
    //   query: {
    //     authorization: this.storage.get('access_token'),
    //   },
    // });
  }
}
