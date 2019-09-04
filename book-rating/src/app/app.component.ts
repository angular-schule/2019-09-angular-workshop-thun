import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Book Rating';

  constructor() {


    const producer = function(observer) {
      observer.next('Hallo');
      observer.next('Hallo');
      observer.next('Hallo');
      observer.next('Hallo');
      observer.next('Hallo');
      observer.next('Hallo');
      observer.next('Hallo');

      setTimeout(observer.error('FEHLER'), 2000);

      observer.complete();
    }




    const myObs = new Observable(producer);
    myObs.subscribe({
      next: value => console.log(value),
      error: err => console.error(err),
      complete: () => console.log('FOOBAR')
    });

  }
}
