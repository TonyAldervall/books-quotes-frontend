import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-quote-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-edit.component.html',
  styleUrl: './quote-edit.component.css'
})
export class QuoteEditComponent {
  quoteId!: string;
  quote: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.quoteId = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getQuoteById(this.quoteId).subscribe({
        next: (res) => this.quote = res,
        error: (err) => console.error('Kunde inte hämta citat', err)
      });
  }

  save() {
    this.apiService.updateQuote(this.quote, this.quoteId).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: (err) => console.error('Kunde inte spara citat', err)
      });
  }

  cancel() {
    this.router.navigate(['/quotes']);
  }
}
