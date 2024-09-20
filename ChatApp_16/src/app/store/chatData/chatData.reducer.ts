import { createReducer, on } from "@ngrx/store"
import { setChats, setSelectedChat } from "./chatData.action"

export interface initialStateModel {
    selectedChat: any
    chats:any[]
}

const initalState:initialStateModel = {
    selectedChat: null,
    chats:[]
}

export const chatReducer = createReducer(
    initalState,
    on(setSelectedChat,(state, { selectedChat }) => ({ ...state, selectedChat })),
    on(setChats,(state, { chats }) => ({ ...state, chats })),
)