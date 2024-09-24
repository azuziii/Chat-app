import { Component, Input } from '@angular/core';
import { ChatMessageRowComponent } from '../chat-message-row/chat-message-row.component';
import { Subject } from 'rxjs';
import { ChatService, Message } from '../../../services/chat.service';

@Component({
  selector: 'app-chat-screen',
  standalone: true,
  imports: [ChatMessageRowComponent],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.css',
})
export class ChatScreenComponent {
  constructor(private chatService: ChatService) {}

  messages: Message[] = [];

  ngOnInit(): void {
    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  shouldShowProfileImage(currentMessage: Message, index: number): boolean {
    if (
      index == 0 ||
      (this.messages[index - 1] &&
        this.messages[index - 1].username != currentMessage.username)
    )
      return true;
    return false;
  }
}
