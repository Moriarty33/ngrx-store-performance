import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AddUserSuccess, GetUsersSuccess, UsersActionTypes } from './users.actions';
import { map, mergeMap, switchMap, take } from 'rxjs/operators';
import { UsersDaoService } from './users.dao.service';
import { usersSelector } from './users.selectors';
import { generateUser } from './users.helper';
import { Observable, zip } from 'rxjs';

@Injectable()
export class UsersEffects {

    @Effect()
    getUsers$: Observable<Action> = this.actions$.pipe(
        ofType(UsersActionTypes.GetUsers),
        mergeMap(() => this.usersDaoService.getUsers().pipe(
            map((users) => GetUsersSuccess(users))
        ))
    );

    @Effect()
    addUser$: Observable<Action> = this.actions$.pipe(
        ofType(UsersActionTypes.AddUser),
        switchMap(() => zip(
            this.store.select(usersSelector).pipe(take(1)),
            this.usersDaoService.getUsers()
        )),
        map(([currentUsers, usersFromBackend]: any) => [
            ...currentUsers,
            ...generateUser(usersFromBackend)
        ]),
        map(users => AddUserSuccess(users))
    );

    constructor(private actions$: Actions,
                private store: Store<any>,
                private usersDaoService: UsersDaoService) {
    }
}
