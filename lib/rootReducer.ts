import { combineReducers } from 'redux';
import postReducer from "../lib/features/posts/postSlice";

const rootReducer = combineReducers({
  posts: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
