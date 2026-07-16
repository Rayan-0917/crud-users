const express=require("express");
const cors=require("cors");
require('dotenv').config();
const pool = require("./config/db");
const userRoutes=require("./routes/userRoutes");


const app=express();

const corsOptions={
    origin: 'https://crud-users-omega-pied.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/user', userRoutes);


app.listen(5000, ()=>{
    console.log("server running on port 5000");
})

