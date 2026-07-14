const express=require("express");
const cors=require("cors");
require('dotenv').config();
const pool = require("./config/db");
const userRoutes=require("./routes/userRoutes");


const app=express();

app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);


app.listen(5000, ()=>{
    console.log("server running on port 5000");
})

