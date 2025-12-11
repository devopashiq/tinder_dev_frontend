import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice';
import feedReducer from './feedSlice';

import connectionReduser from './connectionSlice'
import requestReducer from './requestSlice'

 

console.log(feedReducer);


export const store= configureStore({
  reducer: {user:userReducer,
    feed:feedReducer,
    connection:connectionReduser,
    request:requestReducer
  },
})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch