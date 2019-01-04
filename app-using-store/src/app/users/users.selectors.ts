import { createFeatureSelector, createSelector } from '@ngrx/store';

const rootUsersState = createFeatureSelector('users');
const userListSelector = state => state.usersList;

export const usersSelector = createSelector(rootUsersState, userListSelector);
