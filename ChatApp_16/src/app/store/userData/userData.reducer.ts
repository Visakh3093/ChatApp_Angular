import { createReducer, on } from "@ngrx/store";

import { setUserData } from "./userData.action";
import { UserDataModel } from "src/app/model/user.model";

export interface UserInitialState {
    userData: UserDataModel
}

const initialState:UserInitialState = {
    userData: {
        _id:'',
        email:'',
        name:'',
        mobile:'',
        token:''
    }
}

export const userDataReducer = createReducer(
    initialState,
    on(setUserData, (state, { userData }) => ({ ...state, userData }))
)