import { Outlet } from "react-router"; 
import Navbar from "./components/ui/layouts/Navbar";
import { ToastContainer } from 'react-toastify';
import Footer from "./components/ui/layouts/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
       <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
