import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [],
  templateUrl: './message-bubble.component.html',
  styleUrl: './message-bubble.component.css',
})
export class MessageBubbleComponent {
  @Input({ required: true }) message!: string;
}
