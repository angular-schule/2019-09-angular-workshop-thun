import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookRatingService = TestBed.get(BookRatingService);
    expect(service).toBeTruthy();
  });
});
