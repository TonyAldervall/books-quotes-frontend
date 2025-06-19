import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-add.component.html'
})
export class BookAddComponent {
  book = {
    title: '',
    author: '',
    publishDate: ''
  };

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  submit() {
    this.apiService.addBook(this.book).subscribe({
      next: () => this.router.navigate(['/books']),
      error: (err) => console.error('Kunde inte skapa bok:', err)
    });
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}