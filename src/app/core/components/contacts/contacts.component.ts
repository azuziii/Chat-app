import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { FormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { UserContactRowComponent } from '../user/ui/user-contact-row/user-contact-row.component';
import { ContactsHeaderComponent } from './contacts-header/contacts-header.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    UserContactRowComponent,
    ContactsHeaderComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {}
