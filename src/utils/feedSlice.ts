import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "./userSlice";

type UserSliceState = UserState[] | [];

const initialState: UserSliceState = [] as UserSliceState;

export const feedSlice = createSlice({
    name:'feed',

    initialState,

    reducers:{
        setFeed:(_state,action:PayloadAction<UserSliceState>)=>{
            return action.payload
        },
        removeFeed:(state,action:PayloadAction<string>)=>{
            return   state.filter((feed)=>feed._id !== action.payload)
        },
        removeAllFeed(){
            return initialState
        }
    }
})

export const {setFeed,removeFeed,removeAllFeed}=feedSlice.actions
export default feedSlice.reducer