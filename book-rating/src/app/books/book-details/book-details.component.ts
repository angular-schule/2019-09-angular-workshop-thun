import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, concatMap, switchMap } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Observable } from 'rxjs';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) { }

  ngOnInit() {
    // const isbn = this.route.snapshot.paramMap.get('isbn');
    // console.log(isbn);

    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      switchMap(isbn => this.bs.getSingle(isbn))
    );
  }

}
