import { createAction, props } from "@ngrx/store";
import { ToastModel } from "src/app/model/common.model";




export const setToastMessage = createAction('[common] setCommonData', props<{toast: ToastModel}>())
export const setLoaderData = createAction('[loaderData] setLoaderData', props<{loaderData: boolean}>())
export const setModal = createAction('[modal] setModal', props<{modal: boolean}>())
export const setChatBox = createAction('[chatBox] setChatBox', props<{chatBox: boolean}>())
export const setProfileModal = createAction('[common] setProfileModal', props<{profileModal:boolean}>())
export const setGroupModal = createAction('[common] setGroupModal', props<{groupModal:boolean}>())
export const setSelectedUserModal = createAction('[common] setSelectedUserModal', props<{selectedUserModal:boolean}>())