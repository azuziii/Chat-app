import { Injectable, NgZone } from '@angular/core';
import { StorageService } from './storage.service';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';
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
    private auth: AuthService
  ) {
    socket.on('message', (response: Message) => {
      this.add({
        ...response,
      });
    });

    socket.on('disconnect', (e) => {
      if (this.lastMessage) {
        this.messageQueue.push(this.lastMessage);
        this.lastMessage = null;
      }

      this.auth
        .isAuthenticated()
        .pipe(
          switchMap(() => {
            return this.auth.refresh().pipe(
              tap(() => {
                this.socket.connect();
                this.messageQueue.forEach((message) => {
                  this.send(message.message);
                });
                this.messageQueue = [];
              }),
              catchError((err) => {
                socket.socket.disconnect();
                return of(err);
              })
            );
          })
        )
        .subscribe();
    });
  }

  isDisconeected = false;
  lastMessage: { message: string } | null = null;
  messageQueue: { message: string }[] = [];

  private messagesSubject$ = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject$.asObservable();

  add(message: Message) {
    this.lastMessage = null;
    this.ngZone.run(() => {
      const currentMessages = this.messagesSubject$.value;
      this.messagesSubject$.next([...currentMessages, message]);
    });
  }

  send(textMessage: string) {
    const body: Partial<Message> = {
      message: textMessage,
    };
    this.lastMessage = {
      message: textMessage,
    };
    this.socket.emit('message', body);
  }
}
