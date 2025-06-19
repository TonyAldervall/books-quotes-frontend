import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  books: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('https://localhost:7020/api/Books')
      .subscribe({
        next: (res) => this.books = res,
        error: (err) => console.error('Kunde inte hämta böcker:', err)
      });
  }

  deleteBook(id: number) {
  if (!confirm('Är du säker på att du vill ta bort boken?')) {
    return;
  }

  this.http.delete(`https://localhost:7020/api/Books/${id}`).subscribe({
    next: () => {
      this.books = this.books.filter(book => book.id !== id);
    },
    error: (err) => {
      console.error('Kunde inte ta bort boken', err);
    }
  });
  }
  editBook(book: any) {
    this.router.navigate(['/books/edit', book.id]);
  }
}