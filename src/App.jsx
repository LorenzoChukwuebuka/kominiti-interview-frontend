import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

  import {SignUp} from "./page/signup"
  import { VerifyUser } from './page/verifyUser';
  import { Login } from './page/login';
import { ProtectedRoute } from './routes/protectedRoute';
import { Book } from './page/books';

export const APIURL = import.meta.env.VITE_API_URL;


function App() {
 
  return (
    <>
      <ToastContainer />
      <Routes>
       <Route path="/" element={<SignUp />} />
        <Route path="/verify/user" element={<VerifyUser />} />
        <Route path="/user/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
           <Route path="/books" element={<Book/>} />
        </Route>

      

        {/* Your 404 page
        <Route path="/404" element={<NotFoundPage />} />

        <Route path="*" element={<Navigate to="/404" />} /> */}
      </Routes>
      
    </>
  )
}

export default App
