import { createFeatureSelector, createSelector } from "@ngrx/store";
import { initialStateModel } from "./chatData.reducer";


const selectorState = createFeatureSelector<initialStateModel>('chatData')

export const selectSelectedChat = createSelector(
    selectorState,
    (state)=> state.selectedChat
)

export const selectChats = createSelector(
    selectorState,
    (state)=> state.chats
)