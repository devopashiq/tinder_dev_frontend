import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "./userSlice";



  export interface requestState {
  _id: string,
  firstName: string,
  fromUserId:UserState
  lastName: string,
  photoUrl: string,
  gender: string,
  age: number,
  about:string,
  toUserId:string,
  status:string
}
type UserSliceState = requestState[] | null;

const initialState: UserSliceState = null as UserSliceState;



export const requestSlice = createSlice({
    name:'request',
    initialState,
    reducers:{
        addRequest:(state,action:PayloadAction<UserSliceState>)=>{return action.payload},
        removeRequest:(state,action:PayloadAction<string>)=>{
        if (!state) return state;
        return state?.filter((request)=>request._id!==action.payload)
        }
    }

})

export default  requestSlice.reducer
export const {addRequest,removeRequest}=requestSlice.actions