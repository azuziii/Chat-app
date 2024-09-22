import { Component, ElementRef } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { catchError, tap } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { FriendRowComponent } from '../../friend/friend-row/friend-row.component';

@Component({
  selector: 'app-dialog-add-friend',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    FriendRowComponent,
  ],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css',
})
export class DialogAddFriendComponent {
  constructor(private host: ElementRef<HTMLElement>, private api: ApiService) {}

  visible = true;
  canClose = false;
  username: string = '';
  message = '';
  user: Record<string, any> | null = null;
  state = '';
  actionMessage = '';

  closeDialog() {
    if (this.host) {
      this.host.nativeElement.remove();
    }
  }

  onSave() {
    if (this.username == '') {
      this.visible = true;
      this.message = 'Friend name required';
    } else {
      this.api
        .post('friend/find', {
          username: this.username,
        })
        .pipe(
          tap((r: Record<string, any>) => {
            this.user = r['friend'];
            this.actionMessage = this.state = r['action'];
          }),
          catchError((err) => {
            if (err.error) {
              this.message = err.error.message;
            } else {
              this.message = err.message;
            }
            throw err;
          })
        )
        .subscribe();
    }
  }

  handle() {
    setTimeout(() => {
      this.visible = false;
      this.closeDialog();
    }, 500);
  }
}
