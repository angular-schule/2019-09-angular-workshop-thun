import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { filter, debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { timer, Subject, Observable } from 'rxjs';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  results$: Observable<Book[]>;

  bookForm: FormGroup;
  @Output() create = new EventEmitter<Book>();

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl('')
    });

    this.results$ = this.bookForm.get('title').valueChanges.pipe(
      filter(value => value.length >= 3),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(value => this.bs.search(value)),
      // takeUntil(this.destroy$)
    );
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.dirty;
  }

  logForm() {
    console.log(this.bookForm)
  }

  submitForm() {
    const newBook: Book = {
      ...this.bookForm.value,
      rating: 1
    };

    this.create.emit(newBook);

    this.bookForm.reset({
      isbn: '',
      title: '',
      description: ''
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
  }

}
