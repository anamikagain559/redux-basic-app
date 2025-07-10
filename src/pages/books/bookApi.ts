import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book, BookInput } from '@/types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    createBook: builder.mutation<void, BookInput>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    
  }),
});

export const { useGetBooksQuery, useCreateBookMutation } = bookApi;