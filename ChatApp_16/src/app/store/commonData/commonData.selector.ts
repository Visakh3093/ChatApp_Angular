import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommonInitialModel } from "src/app/model/common.model";


const commonSelectorState = createFeatureSelector<CommonInitialModel>('common')

export const selectToastMessage = createSelector(
    commonSelectorState,
    (state)=>state.toast
)

export const selectLoaderData = createSelector(
    commonSelectorState,
    (state)=>state.loaderData
)

export const selectModal = createSelector(
    commonSelectorState,
    (state)=>state.modal
)

export const selectChatBox = createSelector(
    commonSelectorState,
    (state)=>state.chatBox
)

export const selectProfileModal = createSelector(
    commonSelectorState,
    (state)=>state.profileModal
)

export const selectGroupModal = createSelector(
    commonSelectorState,
    (state)=>state.groupModal
)

export const selectSelectedUserModal = createSelector(
    commonSelectorState,
    (state)=>state.selectedUserModal
)