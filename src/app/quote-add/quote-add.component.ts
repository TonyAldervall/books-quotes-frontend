import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-quote',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './quote-add.component.html'
})
export class QuoteAddComponent {
  quote = {
    text: '',
    author: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  submit() {
    this.http.post('https://localhost:7020/api/Quotes', this.quote).subscribe({
      next: () => this.router.navigate(['/quotes']),
      error: (err) => console.error('Kunde inte skapa citat:', err)
    });
  }

  cancel() {
    this.router.navigate(['/quotes']);
  }
}