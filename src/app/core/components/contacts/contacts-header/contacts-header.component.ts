import { Component, ViewContainerRef } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogAddFriendComponent } from '../../dialogs/add-friend/add-friend.component';

@Component({
  selector: 'app-contacts-header',
  standalone: true,
  imports: [ButtonModule, BadgeModule, DialogAddFriendComponent],
  templateUrl: './contacts-header.component.html',
  styleUrl: './contacts-header.component.css',
})
export class ContactsHeaderComponent {
  constructor(private viewContainerRef: ViewContainerRef) {}

  openAddFriend() {
    this.viewContainerRef.createComponent(DialogAddFriendComponent);
  }
}
