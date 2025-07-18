import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useBorrowBookMutation } from "@/redux/features/borrows/borrowApi";
import { useGetBookByIdQuery } from "@/redux/features/books/bookApi";

type BorrowFormInputs = {
  quantity: number;
  dueDate: string;
};

const BorrowBook = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    toast.error("Book ID is required");
    return null;
  }

  const { data: bookData, isLoading, isError } = useGetBookByIdQuery(id);
  const [borrowBook] = useBorrowBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BorrowFormInputs>();

  const onSubmit = async (data: BorrowFormInputs) => {
    if (!bookData) return;

    const book = bookData?.data ?? bookData;

    if (data.quantity > book.copies) {
      toast.error("Quantity exceeds available copies");
      return;
    }

    try {
      await borrowBook({
        book: id,
        quantity: data.quantity,
        dueDate: data.dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err) {
      toast.error("Failed to borrow book");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading book info...</p>;
  if (isError || !bookData) return <p className="text-center mt-10 text-red-500">Error loading book</p>;

  const book = bookData?.data ?? bookData;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Borrow Book: <span className="text-blue-600">{book.title || "Untitled"}</span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Quantity (max {book.copies})</label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: 1,
              max: {
                value: book.copies,
                message: `Cannot exceed ${book.copies} copies`,
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.quantity && (
            <p className="text-sm text-red-500">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            {...register("dueDate", {
              required: "Due date is required",
              validate: (val) => {
                const selected = dayjs(val);
                if (!selected.isValid() || selected.isBefore(dayjs(), "day")) {
                  return "Due date must be in the future";
                }
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          {errors.dueDate && (
            <p className="text-sm text-red-500">{errors.dueDate.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Borrow
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
