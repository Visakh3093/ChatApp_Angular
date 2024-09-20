import { createAction, props } from "@ngrx/store";
import { UserDataModel } from "src/app/model/user.model";



export const setUserData = createAction('[userData] setUserData', props<{userData:UserDataModel}>())