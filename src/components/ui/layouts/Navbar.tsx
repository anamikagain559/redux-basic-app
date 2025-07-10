import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <div>
        <ul className="flex gap-4">
          <li>
            <Link to="/user" className="text-blue-500 hover:text-blue-700">
              User
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="text-blue-500 hover:text-blue-700">
              Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
