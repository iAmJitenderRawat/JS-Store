import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { CategoryProduct } from "../pages/CategoryProduct";
import { SingleProductPage } from '../pages/SingleProductPage';
import { Cart } from '../pages/Cart';
import { SignUp } from '../pages/SignUp';
import { SignIn } from '../pages/SignIn';
import {PageNotFound} from "../pages/PageNotFound";

export function AllRoutes() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/category/:pages" element={<CategoryProduct />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
