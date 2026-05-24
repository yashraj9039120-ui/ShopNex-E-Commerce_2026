import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../redux/products/productSlice'
import userReducer from '../redux/user/userSlice';
import cartReducer from '../redux/cart/cartSlice';
import orderReducer from '../redux/order/orderSlice';
import adminReducer from '../redux/admin/adminSlice';

export const store=configureStore({
reducer:{
    product:productReducer,
    user:userReducer,
    cart:cartReducer,
    order:orderReducer,
    admin:adminReducer
}
})