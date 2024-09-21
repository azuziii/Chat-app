import { Component } from '@angular/core';
import { UserImageComponent } from '../user-image/user-image.component';

@Component({
  selector: 'app-user-contact-row',
  standalone: true,
  imports: [UserImageComponent],
  templateUrl: './user-contact-row.component.html',
  styleUrl: './user-contact-row.component.css',
})
export class UserContactRowComponent {}
