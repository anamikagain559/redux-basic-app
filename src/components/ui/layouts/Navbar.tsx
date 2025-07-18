import { NavLink } from 'react-router';

const Navbar = () => {
  return (
      <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Library System</h1>
        <div className="space-x-4">

          <NavLink to="/books" className={({ isActive }) => isActive ? 'underline' : ''}>Books</NavLink>
          <NavLink to="/create-book" className={({ isActive }) => isActive ? 'underline' : ''}>Add Book</NavLink>
          <NavLink to="/borrow-summary" className={({ isActive }) => isActive ? 'underline' : ''}>Borrow Summary</NavLink>
      
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
