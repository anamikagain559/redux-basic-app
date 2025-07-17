import { Outlet } from "react-router"; 
import Navbar from "./components/ui/layouts/Navbar";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
       <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
