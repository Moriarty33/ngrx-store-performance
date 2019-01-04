export enum UsersActionTypes {
    GetUsers = '[Users page] GET_USERS',
    GetUsersSuccess = '[Users page] GET_USERS_SUCCESS',
    AddUser = '[Users page] ADD_USER',
    AddUserSuccess = '[Users page] ADD_USER_SUCCESS',
    EditUser = '[User Action] EDIT_USER',
    DeleteUser = '[User Action] DELETE_USER',
}

export const GetUsers = () => ({type: UsersActionTypes.GetUsers});
export const GetUsersSuccess = (payload) => ({type: UsersActionTypes.GetUsersSuccess, payload});

export const AddUser = (payload?) => ({type: UsersActionTypes.AddUser, payload});
export const AddUserSuccess = (payload) => ({type: UsersActionTypes.AddUserSuccess, payload});

export const EditUser = (payload) => ({type: UsersActionTypes.EditUser, payload});
export const DeleteUser = (payload) => ({type: UsersActionTypes.DeleteUser, payload});
