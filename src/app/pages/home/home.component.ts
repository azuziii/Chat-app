import { Component } from '@angular/core';
import { SideBarComponent } from '../../core/components/side-bar/side-bar.component';
import { ContactsComponent } from '../../core/components/contacts/contacts.component';
import { DialogAddFriendComponent } from '../../core/components/dialogs/add-friend/add-friend.component';
import { ChatComponent } from '../../core/components/chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SideBarComponent,
    ContactsComponent,
    DialogAddFriendComponent,
    ChatComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
