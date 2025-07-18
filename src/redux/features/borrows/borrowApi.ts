import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BorrowInput, BorrowSummary } from '@/types';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Borrow', 'Book'],  // Invalidate book data if needed
  endpoints: (builder) => ({
    
    // Borrow a book (POST)
    borrowBook: builder.mutation<void, BorrowInput>({
      query: (borrow) => ({
        url: '/borrow',
        method: 'POST',
        body: borrow,
      }),
      invalidatesTags: ['Borrow', 'Book'], // Refetch borrow summary and book availability
    }),

    // Get summary of borrowed books (GET)
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/borrow',
      providesTags: ['Borrow'],
    }),
    
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
