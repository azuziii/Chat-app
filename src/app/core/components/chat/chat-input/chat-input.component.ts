import { Component } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
})
export class ChatInputComponent {
  constructor(private chatService: ChatService) {}

  value = '';

  onSubmit(event: any) {
    this.value = this.value.trim();
    if (!this.value) return;
    this.chatService.send(this.value);
    this.value = '';
  }
}
