import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddUser, DeleteUser, GetUsers } from './users.actions';
import { usersSelector } from './users.selectors';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, AfterViewChecked {
  public users$: Observable<any>;

  public time = {
    addUser: 0,
    editUser: 0,
    deleteUser: 0,
    bulkAddUser: 0,
    bulkEditUser: 0,
    bulkDeleteUser: 0,
    renderTime: 0
  };
  private startTime;
  private endTime;
  private renderTime;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(GetUsers());
    this.users$ = this.store.select(usersSelector);
  }

  addUser(withoutTimer?) {
    if (!withoutTimer) {
      this.startTimer();
      this.users$.pipe(skip(1), take(1)).subscribe(() => this.time.addUser = this.endTimer());
    }
    this.store.dispatch(AddUser());
  }

  deleteUser(userId, withoutTimer?) {
    if (!withoutTimer) {
      this.startTimer();
      this.users$.pipe(skip(1), take(1)).subscribe(() => this.time.deleteUser = this.endTimer());
    }
    this.store.dispatch(DeleteUser(userId))
  }

  addOneHundredUsers() {
    this.startTimer();
    this.users$.pipe(skip(100), take(1)).subscribe(() => this.time.bulkAddUser = this.endTimer());
    this.users$.pipe(take(100)).subscribe(() => this.addUser(true));
  }

  deleteAllUsers() {
    this.startTimer();
    this.users$.pipe(take(1)).subscribe((users) => {
          this.users$.pipe(skip(users.length), take(1)).subscribe(() =>
              this.time.bulkDeleteUser = this.endTimer());
          this.users$.pipe(take(users.length)).subscribe((currentUsersList) =>
              this.deleteUser(currentUsersList[0]._id, true));
        }
    );
  }

  startTimer() {
    this.startTime = new Date();
  }

  endTimer() {
    this.endTime = new Date();
    var timeDiff = this.endTime - this.startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    return timeDiff;
  }

  renderTimer() {
    this.renderTime = new Date();
    this.time.renderTime = this.renderTime - this.startTime; //in ms
    this.time.renderTime /= 1000;
  }

  ngAfterViewChecked(): void {
    this.renderTimer();
    console.clear();
    console.table(this.time)
  }

}
