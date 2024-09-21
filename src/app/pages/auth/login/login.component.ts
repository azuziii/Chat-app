import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonModule, DividerModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  username = '';
  password = '';
  message = '';

  onLogin(): any {
    this.message = '';
    if (!this.username) return (this.message = "Username can't be empty");
    if (!this.password) return (this.message = "Password can't be empty");
    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe();
  }

  onRegisterNavigate() {}
}
