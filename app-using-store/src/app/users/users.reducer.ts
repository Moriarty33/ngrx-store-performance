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
        case UsersActionTypes.DeleteUser: {
            const userId = action.payload;
            return {
                ...state,
                usersList: state.usersList.filter(user => userId !== user._id)
            }
        }
        default: {
            return state;
        }
    }
}
