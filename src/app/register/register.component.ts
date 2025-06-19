import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Lösenord måste matcha.';
      this.password = '';
      this.confirmPassword = '';
      return;
    }

    const user = { username: this.username, password: this.password };

    this.apiService.addUser(user).subscribe({
      next: () => {
        alert('Konto skapat! Du kan nu logga in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Kunde inte registrera:', err);

        if (err.status === 400 && err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Något gick fel. Prova igen.';
        }
      }
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}

