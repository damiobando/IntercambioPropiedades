const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user");
const reportsRoutes = require("./routes/report");
const offersRoutes = require("./routes/offer");
const port = process.env.PORT || 9000;
//middleware
app.use(express.json());
app.use("/api",userRoutes);
app.use("/api",reportsRoutes);
app.use("/api",offersRoutes);
//routes

app.get("/",(req,res)=>{
    res.send("Welcome to the api");
});
//Connect base de datos
mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log("Conectado a la base de datos"))
.catch((error)=>console.log(error));
app.listen(port,() => console.log("Server listen on port",port));