import { Injectable } from '@angular/core';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookRatingService {

  constructor() { }

  rateUp(book: Book): Book {
    return {
      ...book,
      rating: Math.min(book.rating + 1, 5)
    };
  }

  rateDown(book: Book): Book {
    return {
      ...book,
      rating: book.rating > 1 ? book.rating - 1 : book.rating
    };
  }
}
