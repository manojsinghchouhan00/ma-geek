import express from "express";
import { postSignUp, postLogin } from "../controller/user.js";
import { products, productById } from "../controller/product.js";

const route= express.Router();

route.post('/signup', postSignUp);
route.post('/login', postLogin);
route.get('/products', products);
route.get('/product/:id', productById);

export default route; 