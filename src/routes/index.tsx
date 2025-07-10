import { createBrowserRouter } from "react-router"; 
import App from "@/App";
import User from "@/pages/User";
import Tasks from "@/pages/Tasks";
import BookList from "@/pages/books/Booklist"; 
import CreateBook from "@/pages/books/CreateBook"; 
import EditBook from "@/pages/books/EditBook"; 
import BorrowBook from "@/pages/borrow/BorrowBook";
import BorrowSummary from '@/pages/borrow/BorrowSummary';   
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
          {
        index: true,
        element: <Tasks />,
      },
              {
        path:  "tasks",
        element: <Tasks />,
      },
      {
        path: "user",
        element: <User />,
      },
      { path: 'books', element: <BookList /> },
      { path: 'create-book', element: <CreateBook /> },
      { path: 'edit-book/:id', element: <EditBook /> },
      {path: 'borrow-book/:bookId', element: <BorrowBook/>},
      {path: 'borrow-summary', element: <BorrowSummary/>}
    
    ],
  },
]);

export default router;
