import { createAction, props } from "@ngrx/store";
import { SelectedDataModel } from "src/app/model/chat.model";


export const setSelectedChat = createAction('[chatData] setSelectedChat', props<{selectedChat:SelectedDataModel}>())
export const setChats = createAction('[chatData] setChats', props<{chats: any}>())