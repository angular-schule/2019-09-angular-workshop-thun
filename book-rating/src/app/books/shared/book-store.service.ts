import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiUrl = 'https://api.angular.schule';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Book[]>(this.apiUrl + '/books');
  }

  getSingle(isbn: string) {
    return this.http.get<Book>(`${this.apiUrl}/book/${isbn}`);
  }

  create(book: Book) {
    return this.http.post(
      `${this.apiUrl}/books`,
      book,
      { responseType: 'text' }
    );
  }
}
