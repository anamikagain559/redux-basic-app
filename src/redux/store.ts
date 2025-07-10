import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/redux/features/counter/counterSlice';
import taskReducer from '@/redux/features/counter/task/taskSlice';
import { bookApi } from '@/pages/books/bookApi';
import { borrowApi } from '@/pages/borrow/borrowApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo:taskReducer,
     [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;