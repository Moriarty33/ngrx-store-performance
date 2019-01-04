import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { usersSelector } from './users/users.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'app using store';
  public usersLength$: Observable<number>;

  constructor(private store: Store<any>) {
    this.usersLength$ = this.store.select(usersSelector).pipe(map((users) => users.length));
  }
}
