import { Component, HostBinding, Input } from '@angular/core';
import { MessageBubbleComponent } from '../message-bubble/message-bubble.component';
import { Message } from '../../../services/chat.service';
import { UserImageComponent } from '../../user/ui/user-image/user-image.component';

@Component({
  selector: 'app-chat-message-row',
  standalone: true,
  imports: [MessageBubbleComponent, UserImageComponent],
  templateUrl: './chat-message-row.component.html',
  styleUrl: './chat-message-row.component.css',
})
export class ChatMessageRowComponent {
  @Input({ required: true }) message!: Message;
  @Input({ required: true }) showProfileImage!: boolean;
  @Input({ required: true }) isMessageIncomming!: boolean;

  get profilePicture() {
    return this.message.profile_picture;
  }
}
