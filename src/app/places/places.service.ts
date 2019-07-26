import { Injectable } from '@angular/core';
import {Place} from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
// tslint:disable-next-line: variable-name
  private _places = new BehaviorSubject<Place[]>(
    [
      new Place(
        'p1',
        'Manhattan Mansion',
        'In the heart of New York City',
        'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
        149.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      ),
      new Place(
        'p2',
        'L\'Amour Toujours',
        'A romantic place in Paris ',
        'https://www.parisperfect.com/g/apartment-hero-images/hi_lalande-64-new.jpg',
        189.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      ),
      new Place(
        'p3',
        'The Foggy Palace',
        'Not your average city trip',
        'https://www.finestluxuryvacations.com/uploads/residences/img5ac5074b14e7e.jpg',
        99.99,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      )
    ]
  );

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://freshome.com/wp-content/uploads/2015/11/one-mima-tower.png',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
      );
      this.places.pipe(take(1)).subscribe(places => {
        this._places.next(places.concat(newPlace));
      });
  }
}
