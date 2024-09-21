import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-image',
  standalone: true,
  imports: [],
  templateUrl: './user-image.component.html',
  styleUrl: './user-image.component.css',
})
export class UserImageComponent {
  @Input({ required: true }) src!: string;
  @Input() alt = '';
  @Input() width = '48';
}
