import { UsersActionTypes } from './users.actions';

const initialUsersState = {
    usersList: []
};

export function usersReducer(state = initialUsersState, action) {
    switch (action.type) {
        case UsersActionTypes.GetUsersSuccess: {
            return {
                ...state,
                usersList: action.payload
            }
        }
        case UsersActionTypes.AddUserSuccess: {
            return {
                ...state,
                usersList: action.payload
            }
        }
        default: {
            return state;
        }
    }
}
