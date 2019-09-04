import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;
  @Output() create = new EventEmitter<Book>();

  constructor() { }

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

    this.bookForm.get('title').valueChanges
      .subscribe(value => console.log(value));
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

}
