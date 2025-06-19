import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-quotes',
  imports: [CommonModule, RouterModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuotesComponent {
  quotes: any[] = [];
  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId')!;

    this.apiService.getQuotes().subscribe({
      next: (quotes) => {
        this.quotes = quotes;

        this.apiService.getFavorites(userId).subscribe({
          next: (favoriteQuotes) => {
            const favoriteQuoteIds = favoriteQuotes.map(fq => fq.id);
            
            this.quotes.forEach(q => {
              q.isFavorite = favoriteQuoteIds.includes(q.id);
            });
          },
          error: (err) => console.error('Kunde inte hämta favorit-citat:', err)
        });
      },
      error: (err) => console.error('Kunde inte hämta citat:', err)
    });
  }



  toggleFavorite(quote: any) {
    const userId = localStorage.getItem('userId')!;
    const quoteId = quote.id;

    const favorite = { userId, quoteId };

    if(!quote.isFavorite){
      this.apiService.addFavorite(favorite).subscribe({
        next: () => quote.isFavorite = true,
        error: (err) => console.error('Kunde inte favoritmarkera citat:', err)
      });
    }
    else if(quote.isFavorite){
      this.apiService.deleteFavorite(userId, quote.id).subscribe({
        next: () => {
          quote.isFavorite = false;
        },
        error: (err) => console.error('Kunde inte ta bort favorit', err)
      });
        
    }

  }

}
