import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-my-quotes',
  imports: [CommonModule],
  templateUrl: './my-quotes.component.html',
  styleUrl: './my-quotes.component.css'
})
export class MyQuotesComponent {
  favorites: any[] = [];
  userId: string | null = null;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.loadFavorites();
  }

  loadFavorites() {
    if (!this.userId) return;

    this.apiService.getFavorites(this.userId).subscribe({
        next: (res) => {
          
          this.favorites = res;
        },
        error: (err) => console.error('Kunde inte hämta favoritcitat:', err)
      });
  }

  removeFavorite(quote: any) {
    if (!this.userId) return;

    this.apiService.deleteFavorite(this.userId, quote.id).subscribe({
        next: () => {
          // Ta bort citatet från listan i frontend direkt
          this.favorites = this.favorites.filter(fav => fav.id !== quote.id);
        },
        error: (err) => console.error('Kunde inte ta bort favorit:', err)
      });
  }
}
