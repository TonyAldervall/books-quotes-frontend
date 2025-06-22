import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit {
  bookId!: string;
  book: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getBookById(this.bookId).subscribe({
        next: (res) => this.book = res,
        error: (err) => console.error('Kunde inte hämta bok', err)
      });
  }

  save() {
    this.apiService.updateBook(this.book, this.bookId).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error('Kunde inte spara bok', err)
      });
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
