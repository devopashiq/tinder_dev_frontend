import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

  export interface UserState {
  _id: string,
  firstName: string,
  lastName: string,
  photoUrl: string,
  gender: string,
  age: number,
  about:string
}

type UserSliceState = UserState | null;

const initialState: UserSliceState = null as UserSliceState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      return action.payload; // ✅ returns UserState (valid)
    },
    removeUser: () => {
      return null; // ✅ returns null (valid)
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
