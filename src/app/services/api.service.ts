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
    return this.http.get(`${this.apiUrl}/api/Books/${id}`);
  }

  addBook(book: any) {
    return this.http.post(`${this.apiUrl}/api/Books`, book);
  }
  
  updateBook(book: any, bookId: any){
    return this.http.put(`${this.apiUrl}/api/Books/${bookId}`, book);
  }

  deleteBook(id: any){
    return this.http.delete(`${this.apiUrl}/api/Books/${id}`);
  }

  addUser(user: any){
    return this.http.post(`${this.apiUrl}/api/Users`, user);
  }

  login(body: any){
    return this.http.post<any>(`${this.apiUrl}/api/Auth/Login`, body);
  }

  getFavorites(userId: any){
    return this.http.get<any[]>(`${this.apiUrl}/api/QuoteFavorites/favorites/${userId}`);
  }

  addFavorite(favorite: any){
    return this.http.post(`${this.apiUrl}/api/QuoteFavorites`, favorite);
  }

  deleteFavorite(userId: any, quoteId: any){
    return this.http.delete(`${this.apiUrl}/api/QuoteFavorites/${userId}/${quoteId}`);
  }
  
  getQuotes(){
    return this.http.get<any[]>(`${this.apiUrl}/api/Quotes`);
  }
  addQuote(quote: any){
    return this.http.post(`${this.apiUrl}/api/Quotes`, quote);
  }
}
