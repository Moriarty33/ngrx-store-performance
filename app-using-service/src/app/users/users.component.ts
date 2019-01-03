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

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.getUsers().subscribe();
        this.users$ = this.usersService.users$;
    }

    editUser(userId, withoutTimer?) {
        if (!withoutTimer) {
            this.startTimer();
            this.users$.pipe(skip(1), take(1)).subscribe(() => this.time.editUser = this.endTimer());
        }
        this.usersService.editUser(userId);
    }

    deleteUser(userId, withoutTimer?) {
        if (!withoutTimer) {
            this.startTimer();
            this.users$.pipe(skip(1), take(1)).subscribe(() => this.time.deleteUser = this.endTimer());
        }
        this.usersService.deleteUser(userId);
    }

    addUser(withoutTimer?) {
        if (!withoutTimer) {
            this.startTimer();
            this.users$.pipe(skip(1), take(1)).subscribe(() => this.time.addUser = this.endTimer());
        }
        this.usersService.addUser();
    }

    addOneHundredUsers() {
        this.startTimer();
        this.users$.pipe(skip(100), take(1)).subscribe(() => this.time.bulkAddUser = this.endTimer());
        let i;
        for (i = 0; i < 100; i++) {
            this.addUser(true);
        }
    }

    deleteAllUsers() {
        this.startTimer();
        this.users$.pipe(take(1)).subscribe((users) =>
            this.users$.pipe(skip(users.length), take(1))
                .subscribe(() => this.time.bulkDeleteUser = this.endTimer()));

        this.users$.pipe(take(1)).subscribe((users: any[]) =>
            users.forEach(user => this.deleteUser(user._id, true)))
    }

    editAllUsers() {
        this.startTimer();
        this.users$.pipe(take(1)).subscribe((users) =>
            this.users$.pipe(skip(users.length), take(1))
                .subscribe(() => this.time.bulkEditUser = this.endTimer()));

        this.users$.pipe(take(1)).subscribe((users: any[]) =>
            users.forEach(user => this.editUser(user._id, true)))
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
