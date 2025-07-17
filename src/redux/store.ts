import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/redux/features/counter/counterSlice';
import taskReducer from '@/redux/features/counter/task/taskSlice';
import { bookApi } from '@/redux/features/books/bookApi';
import { borrowApi } from '@/redux/features/borrows/borrowApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo:taskReducer,
     [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bookApi.middleware)
      .concat(borrowApi.middleware),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;