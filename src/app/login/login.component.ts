import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('https://localhost:7020/api/Auth/Login', body)
      .subscribe({
        next: (res) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res.userId);

          console.log(localStorage.getItem('accessToken'), localStorage.getItem('username'), localStorage.getItem('userId'));

          console.log('Login response:', res);
          
          this.router.navigate(['/books']);
        },
        error: (err) => {
          alert('Fel användarnamn eller lösenord.');
        }
      });
  }
}
