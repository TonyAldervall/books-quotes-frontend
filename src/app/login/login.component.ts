import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

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

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  login() {
    const body = {
      username: this.username,
      password: this.password
    };

    this.apiService.login(body).subscribe({
        next: (res) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res.userId);
          
          this.router.navigate(['/books']);
        },
        error: (err) => {
          alert('Fel användarnamn eller lösenord.');
        }
      });
  }
}
