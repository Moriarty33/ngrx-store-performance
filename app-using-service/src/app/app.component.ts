import { Component } from '@angular/core';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app using service';

  constructor(public usersService: UsersService) {
  }
}
