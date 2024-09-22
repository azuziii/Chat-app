import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserContactRowComponent } from '../../user/ui/user-contact-row/user-contact-row.component';
import { UserImageComponent } from '../../user/ui/user-image/user-image.component';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../services/api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-friend-row',
  standalone: true,
  imports: [UserContactRowComponent, UserImageComponent, ButtonModule],
  templateUrl: './friend-row.component.html',
  styleUrl: './friend-row.component.css',
})
export class FriendRowComponent {
  constructor(private api: ApiService) {}

  @Input({ required: true }) user!: Record<string, any>;
  @Input({ required: true }) state!: string;
  @Input({ required: true }) buttonText!: string;
  @Output() done = new EventEmitter<string>();

  onAction() {
    this.api
      .post(`friend`, {
        username: this.user['username'],
      })
      .pipe(
        tap((r: Record<string, any>) => {
          this.buttonText = this.state = r['action'];
        })
      )
      .subscribe();
  }
}
