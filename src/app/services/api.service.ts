import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getBooks(){
    return this.http.get<any[]>(`${this.apiUrl}/api/Books`);
  }

  getBookById(id: any){
    return this.http.get(`https://localhost:7020/api/Books/${id}`);
  }

  addBook(book: any) {
    return this.http.post(`${this.apiUrl}/api/Books`, book);
  }
  
  updateBook(book: any, bookId: any){
    return this.http.put(`https://localhost:7020/api/Books/${bookId}`, book);
  }

  deleteBook(id: any){
    return this.http.delete(`https://localhost:7020/api/Books/${id}`);
  }

  addUser(user: any){
    return this.http.post(`${this.apiUrl}/api/Users`, user);
  }

  login(body: any){
    return this.http.post<any>('https://localhost:7020/api/Auth/Login', body);
  }

  getFavorites(userId: any){
    return this.http.get<any[]>(`https://localhost:7020/api/QuoteFavorites/favorites/${userId}`);
  }

  addFavorite(favorite: any){
    return this.http.post('https://localhost:7020/api/QuoteFavorites', favorite);
  }

  deleteFavorite(userId: any, quoteId: any){
    return this.http.delete(`https://localhost:7020/api/QuoteFavorites/${userId}/${quoteId}`);
  }
  
  getQuotes(){
    return this.http.get<any[]>('https://localhost:7020/api/Quotes');
  }
  addQuote(quote: any){
    return this.http.post('https://localhost:7020/api/Quotes', quote);
  }
}
