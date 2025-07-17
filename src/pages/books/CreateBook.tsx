export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY',
}

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useCreateBookMutation } from '@/redux/features/books/bookApi';
import { toast } from 'react-toastify';

type BookFormInputs = {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
};

const CreateBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormInputs>();

  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: BookFormInputs) => {
    try {
      const payload = {
        ...data,
        available: data.copies > 0,
      };
      await createBook(payload).unwrap();
      toast.success('Book created successfully!');
      reset();
      navigate('/books');
    } catch (error: any) {
      toast.error('Failed to create book');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('title', { required: 'Title is required' })}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <input
            {...register('author', { required: 'Author is required' })}
            placeholder="Author"
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
        </div>

        <div>
          <select
            {...register('genre', { required: 'Genre is required' })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Genre</option>
            {Object.entries(Genre).map(([key, value]) => (
              <option key={key} value={value}>
                {value.replace('_', ' ')}
              </option>
            ))}
          </select>
          {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
        </div>

        <div>
          <input
            {...register('isbn', { required: 'ISBN is required' })}
            placeholder="ISBN"
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.isbn && <p className="text-red-500 text-sm">{errors.isbn.message}</p>}
        </div>

        <textarea
          {...register('description')}
          placeholder="Description (optional)"
          className="w-full px-4 py-2 border rounded-md"
        />

        <div>
          <input
            {...register('copies', {
              required: 'Copies is required',
              valueAsNumber: true,
              min: { value: 0, message: 'Copies must be 0 or more' },
              validate: (value) =>
                Number.isInteger(value) || 'Copies must be an integer',
            })}
            type="number"
            placeholder="Copies"
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.copies && <p className="text-red-500 text-sm">{errors.copies.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('available')} defaultChecked />
          <label>Available</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;