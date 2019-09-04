import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  url = '//angular.schule';
  books: Book[];

  constructor(private rs: BookRatingService, private bs: BookStoreService) { }

  ngOnInit() {
    this.bs.getAll()
      .subscribe(
        books => this.books = books,
        err => console.log('COMP ERR', err)
      );
  }

  rateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateSortList(ratedBook);
  }

  rateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateSortList(ratedBook);
  }

  updateSortList(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);
  }

  createBook(book: Book) {
    this.bs.create(book).subscribe(() => {
      this.books = [...this.books, book];
    });

  }

}
