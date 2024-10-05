import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config(); //Configuring dotenv file to read the data from .env file
const app = express(); //creating an express object
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json()); //Middleware. This allows is to accept JSON data in the req.body

app.use("/api/products",productRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get( "*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    } )
}

// Listens to a port(Here, port 5000), and runs a function while listening to it
app.listen( PORT , ()=>{
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
} );

