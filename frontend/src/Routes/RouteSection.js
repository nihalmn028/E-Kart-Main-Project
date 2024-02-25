import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from '../Pages/HomePage/HomePage'
import SignUpPage from '../Pages/SignUpPage/SignUpPage'
import LoginPage from '../Pages/LoginPage/LoginPage'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import ForgotPassPage from '../Pages/ForgotPassPage/ForgotPassPage'
import NewPasswordPage from '../Pages/NewPasswordPage/NewPasswordPage'
import OtpPage from '../Pages/OtpPage/OtpPage'

import ProductManagementPage from '../Pages/ProductManagementPage/ProductManagementPage'
import ProductCreationPage from '../Pages/ProductCreationPage/ProductCreationPage'
import AllProductPage from '../Pages/AllProductPage/AllProductPage'
import SingleProductPage from '../Pages/SingleProductPage/SingleProductPage'
import UserProfilePage from '../Pages/UserProfilePage/UserProfilePage'
import UsermanagementPage from '../Pages/UsermanagementPage/UsermanagementPage'
import ProfileEditPage from '../Pages/Profileeditpage/ProfileEditPage'
import ProductUpdatePage from '../Pages/ProductUpdatePage/ProductUpdatePage'
import Searchproductpage from '../Pages/Searchproductpage/Searchproductpage'
import CartPage from '../Pages/Cartpage/CartPage'
import CheckoutPage from '../Pages/CheckoutPage/CheckoutPage'

function RouteSection() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/signup' element={<SignUpPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/forgotpass' element={<ForgotPassPage />}></Route>
          <Route path='/newpass' element={<NewPasswordPage />}></Route>
          <Route path='/otp' element={<OtpPage />}></Route>
          <Route path='/productmanagement' element={<ProductManagementPage/>}></Route> 
          <Route path='/addproduct' element={<ProductCreationPage/>}></Route> 
          <Route path='/allproducts' element={<AllProductPage/>}></Route>
          <Route path='/singleproduct' element={<SingleProductPage/>}></Route>
          <Route path='/userprofile' element={<UserProfilePage/>}></Route>
           <Route path='/usermanagement' element={<UsermanagementPage/>}></Route>
         <Route path='/profileedit' element={<ProfileEditPage/>}></Route>
         <Route path='/productupdate' element={<ProductUpdatePage/>}></Route>
         <Route path='/searchproduct' element={<Searchproductpage/>}></Route>
         <Route path='/allcarts' element={<CartPage/>}></Route>
         <Route path='/checkout' element={<CheckoutPage/>}></Route>


          <Route path='/404' element={<ErrorPage />}></Route>
          <Route path='/*' element={<Navigate to={'/404'} />}></Route>
        </Routes>
      </BrowserRouter>   </div>
  )
}

export default RouteSection