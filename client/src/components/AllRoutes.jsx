import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { CategoryProduct } from "../pages/CategoryProduct";
import { SingleProductPage } from '../pages/SingleProductPage';
import { Cart } from '../pages/Cart';
import { SignUp } from '../pages/SignUp';
import { SignIn } from '../pages/SignIn';
import {PageNotFound} from "../pages/PageNotFound";
import { Checkout } from '../pages/Checkout';
import { PrivateRoute } from './PrivateRoute';

export function AllRoutes() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/category/:pages" element={<CategoryProduct />} />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <SingleProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
