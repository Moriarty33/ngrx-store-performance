import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UsersDaoService } from './users.dao.service';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public users$ = new BehaviorSubject([]);

    constructor(private usersDaoService: UsersDaoService) {
    }

    getUsers() {
        return this.usersDaoService.getUsers().pipe(tap((users: any[]) => this.users$.next(users)));
    }

    editUser(userId: string) {
        this.users$.pipe(take(1), map((users) => users.map(user => ({
            ...user,
            ...(user._id === userId && this.modifyUser(user))
        })))).subscribe((users) => this.users$.next(users));
    }

    addUser() {
        combineLatest(this.users$, this.usersDaoService.getUsers()).pipe(
            take(1),
            map(([currentUsers, usersFromBackend]: any) => [
                ...currentUsers,
                ...this.generateUser(usersFromBackend)
            ])
        ).subscribe((users) => this.users$.next(users));
    }

    deleteUser(userId) {
        this.users$.pipe(take(1), map((users) => users.filter(user => userId !== user._id)))
            .subscribe((users) => this.users$.next(users));
    }

    private modifyUser(user): any {
        return {
            ...user,
            age: user.age + 1,
            name: {
                ...user.name,
                last: user.name.last + ' (edited)'
            }
        };
    }

    private getRandomUserIndex(usersLength) {
        return Math.floor(Math.random() * usersLength);
    }

    private generateUser(users) {
        let user = users[this.getRandomUserIndex(users.length)];
        user._id = uuid();
        return user;
    }
}
