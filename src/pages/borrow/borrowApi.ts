import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BorrowInput, BorrowSummary } from '@/types';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/borrow' }),
  tagTypes: ['Borrow', 'Book'],  
  endpoints: (builder) => ({
    borrowBook: builder.mutation<void, BorrowInput>({
      query: (borrow) => ({
        url: '/borrow',
        method: 'POST',
        body: borrow,
      }),
      invalidatesTags: ['Borrow', 'Book'],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/borrow-summary',
      providesTags: ['Borrow'],
    }),
  }),
});


export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
