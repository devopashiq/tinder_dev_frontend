import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "./userSlice";


type UserSliceState = UserState[] | null;

const initialState: UserSliceState = null as UserSliceState;

export const  connectionSlice = createSlice({
    name:'connection',
    initialState,
    reducers:{
        addConnection:(state,action)=>{
          return  action.payload
        },
        removeConnection:()=>{
            return null
        }
    }

})


export const  {addConnection,removeConnection} =connectionSlice.actions;
export default  connectionSlice.reducer
