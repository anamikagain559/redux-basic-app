import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/features/books/bookApi";
import { useNavigate } from "react-router";
import type { Book } from "@/types";
import { toast } from 'react-toastify';
const BookList = () => {
 const { data, isLoading, isError } = useGetBooksQuery();
  const navigate = useNavigate();

  const books: Book[] = data?.data || []; 

  console.log(books);
 const [deleteBook] = useDeleteBookMutation();

 const handleDelete = async (id: string) => {
  const confirmed = window.confirm('Are you sure you want to delete this book?');
  if (!confirmed) return;

  try {
    await deleteBook(id).unwrap(); 
    toast.success('Book deleted successfully');
  } catch (err) {
    console.error(err);
    toast.error('Failed to delete book');
  }
};
  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-red-600 text-center mt-10">Error fetching books.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold"> Book Management</h1>
        <Button onClick={() => navigate("/create-book")} className="bg-green-400 text-white hover:bg-red-700" >Add New Book</Button>
      
      </div>

      <Card className="p-4 shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>{book.copies > 0 ? "✅ Available" : "❌ Unavailable"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button className="bg-blue-400 text-white hover:bg-red-700" size="sm" onClick={() => navigate(`/edit-book/${book._id}`)}>
                      Edit
                    </Button>
                    <Button className="bg-red-400 text-white hover:bg-red-700" variant="destructive" size="sm" onClick={() => handleDelete(book._id)}>
                      Delete
                    </Button>
                    <Button size="sm" className="bg-cyan-400 text-white hover:bg-red-700" variant="outline" onClick={() => navigate(`/borrow-book/${book._id}`)}>
                      Borrow
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default BookList;

