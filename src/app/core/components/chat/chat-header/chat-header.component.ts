import { Component } from '@angular/core';
import { UserMiniRowComponent } from '../../user/ui/user-mini-row/user-mini-row.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [UserMiniRowComponent, ButtonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css',
})
export class ChatHeaderComponent {}
