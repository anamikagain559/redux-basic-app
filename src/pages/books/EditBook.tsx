import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useUpdateBookMutation, useGetBookByIdQuery } from '@/redux/features/books/bookApi';
import { toast } from 'react-toastify';
import { Genre } from '@/types';

type BookFormInputs = {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
};

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading: isLoadingBook, isError } = useGetBookByIdQuery(id!);
  console.log(book);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<BookFormInputs>({
    defaultValues: {
      title: '',
      author: '',
      genre: Genre.FICTION,
      isbn: '',
      description: '',
      copies: 0,
      available: true,
    },
  });

useEffect(() => {
  if (book) {
    reset({
      title: book.data.title ?? '',
      author: book.data.author ?? '',
      genre: book.data.genre ?? Genre.FICTION,
      isbn: book.data.isbn ?? '',
      description: book.data.description ?? '',
      copies: book.data.copies ?? 0,
      available: book.data.available ?? true,
    });
  }
}, [book, reset]);

  const onSubmit = async (data: BookFormInputs) => {
    try {
      await updateBook({ id: id!, data: { ...data, available: data.copies > 0 } }).unwrap();
      toast.success('Book updated successfully!');
      navigate('/books');
    } catch (error) {
      toast.error('Failed to update book');
    }
  };

  if (isLoadingBook) return <p className="text-center">Loading book data...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load book data</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register('title', { required: 'Title is required' })}
          placeholder="Title" 
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <input
          {...register('author', { required: 'Author is required' })}
          placeholder="Author"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}

        <select
          {...register('genre', { required: 'Genre is required' })}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select Genre</option>
          {Object.values(Genre).map((value) => (
            <option key={value} value={value}>
              {value.replace('_', ' ')}
            </option>
          ))}
        </select>
        {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}

        <input
          {...register('isbn', { required: 'ISBN is required' })}
          placeholder="ISBN"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}

        <textarea
          {...register('description')}
          placeholder="Description (optional)"
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          {...register('copies', {
            required: 'Copies is required',
            valueAsNumber: true,
            min: { value: 0, message: 'Copies must be 0 or more' },
            validate: (value) => Number.isInteger(value) || 'Copies must be an integer',
          })}
          type="number"
          placeholder="Copies"
          className="w-full px-4 py-2 border rounded-md"
        />
        {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('available')}
            checked={watch('available')}
            onChange={(e) => reset({ ...watch(), available: e.target.checked })}
          />
          <label>Available</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
