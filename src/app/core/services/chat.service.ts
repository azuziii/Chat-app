import { Injectable, NgZone } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';
import { SocketService } from './socket.service';
import { AuthService } from './auth.service';

export interface Message {
  message: string;
  username: string;
  profile_picture: string;
  time: string;
  isIncomming: boolean;
}

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
    socket.on('message', (response: Message) => {
      console.log('socket sadasd');
      this.add({
        ...response,
      });
    });

    socket.on('token_expired', () => {
      console.log(socket.socket.connected);
      console.log('socket refresh');
      this.auth.refresh().subscribe({
        next: () => {
          this.socket.connect();
          console.log(10);
        },
        error: () => {
          console.log(100);
        },
      });
    });
  }

  private messagesSubject$ = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject$.asObservable();

  add(message: Message) {
    this.ngZone.run(() => {
      const currentMessages = this.messagesSubject$.value;
      this.messagesSubject$.next([...currentMessages, message]);
    });
  }

  send(textMessage: string) {
    const body: Partial<Message> = {
      message: textMessage,
    };
    this.socket.emit('message', body, (resp: any) => {
      console.log(100);
      console.log(resp);
      console.log(100);
    });
  }
}
