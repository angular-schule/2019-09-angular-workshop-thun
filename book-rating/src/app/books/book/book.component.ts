import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }

  getStars() {
    return new Array(this.book.rating);
  }

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }

}
