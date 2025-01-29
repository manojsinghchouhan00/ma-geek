import { response } from "express";
import product from "../Model/productSchema.js";

export const products = (req,res)=>{
    try{
        product.find()
            .then(response=>{
                res.status(200).json({
                    products:response
                })
            })
    }
    catch(error){
        console.log(error);
    }

}

export const productById = (req,res) =>{
    try{
        const {id} = req.params;
        product.find({"id":id})
            .then(response=>{
                res.status(200).json({
                    detail:response
                })
            })
    }
    catch(error){
        console.log(error);
    }
}