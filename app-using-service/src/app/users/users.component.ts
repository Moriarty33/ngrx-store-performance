import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { skip, take } from 'rxjs/operators';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, AfterViewChecked {
    public users$: Observable<any>;
    public timer = new Timer();

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.getUsers().subscribe();
        this.users$ = this.usersService.users$;
    }

    editUser(userId, withoutTimer?) {
        if (!withoutTimer) {
            this.timer.startTimer();
            this.users$.pipe(skip(1), take(1)).subscribe(() => this.timer.dispatchEndTimer('editUser'));
        }
        this.usersService.editUser(userId);
    }

    deleteUser(userId, withoutTimer?) {
        if (!withoutTimer) {
            this.timer.startTimer();
            this.users$.pipe(skip(1), take(1)).subscribe(() => this.timer.dispatchEndTimer('deleteUser'));
        }
        this.usersService.deleteUser(userId);
    }

    addUser(withoutTimer?) {
        if (!withoutTimer) {
            this.timer.startTimer();
            this.users$.pipe(skip(1), take(1)).subscribe(() => this.timer.dispatchEndTimer('addUser'));
        }
        this.usersService.addUser();
    }

    addOneHundredUsers() {
        this.timer.startTimer();
        this.users$.pipe(skip(100), take(1)).subscribe(() => this.timer.dispatchEndTimer('bulkAddUser'));
        this.users$.pipe(take(100)).subscribe(() => this.addUser(true));
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

    editAllUsers() {
        this.timer.startTimer();
        this.users$.pipe(take(1)).subscribe((users) =>
            this.users$.pipe(skip(users.length), take(1))
                .subscribe(() => this.timer.dispatchEndTimer('bulkEditUser')));

        this.users$.pipe(take(1)).subscribe((users: any[]) =>
            users.forEach(user => this.editUser(user._id, true)))
    }

    ngAfterViewChecked(): void {
        this.timer.renderTimer();
        console.clear();
        console.table(this.timer.time)
    }
}


class Timer {
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
        this.time[action] = this.endTimer();
    }

    renderTimer() {
        this.renderTime = new Date();
        this.time.renderTime = this.renderTime - this.startTime; //in ms
        this.time.renderTime /= 1000;
    }
}
