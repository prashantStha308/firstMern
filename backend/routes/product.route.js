// product.route.js is same as product.js nai, we just added .route to show that this is a route file ho
// Teslai ignore garda hunxa. We can even keep the name product.js and nothing will change
import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";

const router = express.Router();


router.get( "/",getProduct )
// router.get, uses the GET method. A function is also used inside to perform action on datas
router.post( "/", createProduct );
// PUT method to upadte the product, we can also use the PATCH method
router.put("/:id", updateProduct);
// DELETE method to delete the Product.
router.delete("/:id", deleteProduct);

export default router; 