import { Injectable, NgZone } from '@angular/core';
import { SocketService } from './socket.service';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private socket: SocketService,
    private ngZone: NgZone,
    private storage: StorageService,
    private auth: AuthService
  ) {
    socket.on('message', (response) => {
      console.log(response);
      const user = storage.get('user');
      this.add({
        user: {
          username: response.username,
          // profile_picture: response.profile_picture,
        },
        message: response.message,
        time: new Date(),
        isIncomming: user.username != response.username,
      });
    });

    socket.on('tokenExpired', (data) => {
      console.log(10000);
      this.auth.refresh().subscribe({
        next: () => {
          socket.reconnect();
          console.log(9999);
        },
      });
    });
  }

  private messagesSubject$ = new BehaviorSubject<any[]>([
    // {
    //   isIncomming: false,
    //   message:
    //     '',
    //   time: new Date(),
    //   user: {
    //     profile_picture: '',
    //     username: 'Usenm',
    //   },
    // },
  ]);
  messages$ = this.messagesSubject$.asObservable();

  outgoingMessage(message: Record<string, any>) {
    this.socket.emit('message', message);
  }

  add(message: any) {
    this.ngZone.run(() => {
      const currentMessages = this.messagesSubject$.value;
      this.messagesSubject$.next([...currentMessages, message]);
    });
  }

  send(textMessage: string) {
    const message = {
      isIncomming: false,
      message: textMessage,
      time: new Date(),
      user: this.storage.get('user'),
    };
    this.add(message);
    this.outgoingMessage({ message: message.message });
  }
}
