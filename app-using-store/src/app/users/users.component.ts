import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddUser, DeleteUser, EditUser, GetUsers } from './users.actions';
import { usersSelector } from './users.selectors';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, AfterViewChecked {
  public users$: Observable<any>;
  public timer = new Timer();

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(GetUsers());
    this.users$ = this.store.select(usersSelector);
  }

  addUser(withoutTimer?) {
    if (!withoutTimer) {
      this.timer.startTimer();
      this.users$.pipe(skip(1), take(1)).subscribe(() => this.timer.dispatchEndTimer('addUser'));
    }
    this.store.dispatch(AddUser());
  }

  editUser(userId, withoutTimer?) {
    if (!withoutTimer) {
      this.timer.startTimer();
      this.users$.pipe(skip(1), take(1)).subscribe(() => this.timer.dispatchEndTimer('editUser'));
    }
    this.store.dispatch(EditUser(userId));
  }

  deleteUser(userId, withoutTimer?) {
    if (!withoutTimer) {
      this.timer.startTimer();
      this.users$.pipe(skip(1), take(1)).subscribe(() => this.timer.dispatchEndTimer('deleteUser'));
    }
    this.store.dispatch(DeleteUser(userId));
  }

  addOneHundredUsers() {
    this.timer.startTimer();
    this.users$.pipe(skip(100), take(1)).subscribe(() => this.timer.dispatchEndTimer('bulkAddUser'));
    this.users$.pipe(take(100)).subscribe(() => this.addUser(true));
  }

  editAllUsers() {
    this.timer.startTimer();
    this.users$.pipe(take(1)).subscribe((users) =>
        this.users$.pipe(skip(users.length), take(1))
            .subscribe(() => this.timer.dispatchEndTimer('bulkEditUser')));

    this.users$.pipe(take(1)).subscribe((users: any[]) =>
        users.forEach(user => this.editUser(user._id, true)))
  }

  deleteAllUsers() {
    this.timer.startTimer();
    this.users$.pipe(take(1)).subscribe((users) => {
          this.users$.pipe(skip(users.length), take(1)).subscribe(() =>
              this.timer.dispatchEndTimer('bulkDeleteUser'));
          this.users$.pipe(take(users.length)).subscribe((currentUsersList) =>
              this.deleteUser(currentUsersList[0]._id, true));
        }
    );
  }

  ngAfterViewChecked(): void {
    this.timer.renderTimer();
    console.clear();
    console.table(this.timer.time, ['stringValues', 'callCount', 'avg']);
  }

}

class Timer {
  public time = {
    addUser: {
      values: [],
      avg: 0,
      callCount: 0,
      stringValues: ''
    },
    editUser: {
      values: [],
      avg: 0,
      callCount: 0,
      stringValues: ''
    },
    deleteUser: {
      values: [],
      avg: 0,
      callCount: 0,
      stringValues: ''
    },
    bulkAddUser: {
      values: [],
      avg: 0,
      callCount: 0,
      stringValues: ''
    },
    bulkEditUser: {
      values: [],
      avg: 0,
      callCount: 0,
      stringValues: ''
    },
    bulkDeleteUser: {
      values: [],
      avg: 0,
      callCount: 0,
      stringValues: ''
    },
    renderTime: 0
  };

  private startTime;
  private endTime;
  private renderTime;
  private average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

  startTimer() {
    this.startTime = new Date();
  }

  private endTimer() {
    this.endTime = new Date();
    var timeDiff = this.endTime - this.startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    return timeDiff;
  }

  dispatchEndTimer(action) {
    this.time[action].values.push(this.endTimer());
    this.time[action].avg = this.average(this.time[action].values);
    this.time[action].callCount = this.time[action].callCount+1;
    this.time[action].stringValues = this.time[action].values.join(', ');
  }

  renderTimer() {
    this.renderTime = new Date();
    this.time.renderTime = this.renderTime - this.startTime; //in ms
    this.time.renderTime /= 1000;
  }
}
