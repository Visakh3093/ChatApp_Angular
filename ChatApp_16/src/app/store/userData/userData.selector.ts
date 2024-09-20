import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserInitialState } from "./userData.reducer";

const selectorState = createFeatureSelector<UserInitialState>('userData')

export const selectUserData = createSelector(
    selectorState,
    (state)=> state.userData
)