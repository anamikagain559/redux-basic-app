import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book, BookInput } from '@/types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBookById: builder.query<Book, string>({
  query: (id) => `/books/${id}`,
  providesTags: (result, error, id) => [{ type: 'Book', id }],
}),
    createBook: builder.mutation<void, BookInput>({
      query: (books) => ({
        url: '/books',
        method: 'POST',
        body: books,
      }),
      invalidatesTags: ['Book'],
    }),
     updateBook: builder.mutation<void, { id: string; data: BookInput }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PUT', // or PATCH if your API supports partial update
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
  }),
 
  
});

export const { useGetBooksQuery,useGetBookByIdQuery, useCreateBookMutation ,useDeleteBookMutation ,useUpdateBookMutation} = bookApi;