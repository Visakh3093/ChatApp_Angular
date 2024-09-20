import { createReducer, on } from "@ngrx/store";
import { CommonInitialModel } from "src/app/model/common.model";
import { setChatBox, setGroupModal, setLoaderData, setModal, setProfileModal, setSelectedUserModal, setToastMessage } from "./commonData.action";


const initialState:CommonInitialModel = {
    toast: {
        toastMessage: '',
        type: 'danger',
    },    
    loaderData: false,
    modal: false,
    chatBox: false,
    profileModal:false,
    groupModal:false,
    selectedUserModal:false
}


export const commonReducer = createReducer(
    initialState,
    on(setToastMessage,(state, { toast }) => ({ ...state, toast })),
    on(setLoaderData,(state, { loaderData }) => ({ ...state, loaderData })),
    on(setModal,(state, { modal }) => ({ ...state, modal })),
    on(setChatBox,(state, { chatBox }) => ({ ...state, chatBox })),
    on(setProfileModal,(state, {profileModal})=>({...state, profileModal})),
    on(setGroupModal,(state, {groupModal})=>({...state, groupModal})),
    on(setSelectedUserModal, (state, {selectedUserModal})=>({...state, selectedUserModal }))
)



