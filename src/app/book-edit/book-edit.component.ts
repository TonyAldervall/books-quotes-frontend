import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit {
  bookId!: string;
  book: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.loadBook();
  }

  loadBook() {
    this.http.get(`https://localhost:7020/api/Books/${this.bookId}`)
      .subscribe({
        next: (res) => this.book = res,
        error: (err) => console.error('Could not load book', err)
      });
  }

  save() {
    this.http.put(`https://localhost:7020/api/Books/${this.bookId}`, this.book)
      .subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error('Could not save book', err)
      });
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
