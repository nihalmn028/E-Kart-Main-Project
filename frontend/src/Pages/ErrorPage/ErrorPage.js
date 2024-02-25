import React from 'react'
import Error from '../../Components/Error/Error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ErrorPage() {
  return (
    <div>
      <Error/>
      <ToastContainer/>
    </div>
  )
}

export default ErrorPage