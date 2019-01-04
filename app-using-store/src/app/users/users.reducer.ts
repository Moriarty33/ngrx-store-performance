import { UsersActionTypes } from './users.actions';
import { modifyUser } from './users.helper';

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
        case UsersActionTypes.EditUser: {
            const userId = action.payload;
            return {
                ...state,
                usersList: state.usersList.map(user => ({
                    ...user,
                    ...(user._id === userId && modifyUser(user))
                }))
            }
        }
        default: {
            return state;
        }
    }
}
