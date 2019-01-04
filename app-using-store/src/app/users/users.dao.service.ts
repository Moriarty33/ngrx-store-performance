import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersDaoService {

  constructor(private httpClient: HttpClient) {
  }

  getUsers() {
    return this.httpClient.get('//localhost:3000/general-data').pipe(map(({data}: any) => data));
  }
}
