import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-quotes',
  imports: [CommonModule],
  templateUrl: './my-quotes.component.html',
  styleUrl: './my-quotes.component.css'
})
export class MyQuotesComponent {
  favorites: any[] = [];
  userId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadFavorites();
  }

  loadFavorites() {
    if (!this.userId) return;

    this.http.get<any[]>(`https://localhost:7020/api/QuoteFavorites/favorites/${this.userId}`)
      .subscribe({
        next: (res) => {
          // Anta att API returnerar en lista med quotes direkt
          this.favorites = res;
        },
        error: (err) => console.error('Kunde inte hämta favoritcitat:', err)
      });
  }

  removeFavorite(quote: any) {
    if (!this.userId) return;

    this.http.delete(`https://localhost:7020/api/QuoteFavorites/${this.userId}/${quote.id}`)
      .subscribe({
        next: () => {
          // Ta bort citatet från listan i frontend direkt
          this.favorites = this.favorites.filter(fav => fav.id !== quote.id);
        },
        error: (err) => console.error('Kunde inte ta bort favorit:', err)
      });
  }
}
