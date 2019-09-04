import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiUrl = 'https://api.angular.schule';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Book[]>(this.apiUrl + '/books').pipe(
      catchError(err => {
        console.log('SRVC ERR', err);

        // return of([]); // Fehler unterdrücken
        return throwError('BÖSER FEHLER!'); // Fehler weiterwerfen
      })
    );
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

  search(term: string) {
    return this.http.get<Book[]>(`${this.apiUrl}/books/search/${term}`);
  }
}
