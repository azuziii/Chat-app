import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ButtonModule, DividerModule, InputTextModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  username = '';
  email = '';
  password = '';
  message = '';

  onRegister(): any {
    this.message = '';
    if (!this.username) return (this.message = "Username can't be empty");
    if (!this.email) return (this.message = "Email can't be empty");
    if (!this.password) return (this.message = "Password can't be empty");

    this.authService
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          this.message = err;
          return of(err);
        })
      )
      .subscribe();
  }

  onNavigateNavigate() {
    this.router.navigate(['/login']);
  }
}
