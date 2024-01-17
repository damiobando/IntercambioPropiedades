const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user");
const reportsRoutes = require("./routes/report");
const offersRoutes = require("./routes/offer");
const propertiesRoutes = require("./routes/property");
const preferenceRoutes = require("./routes/preference");
const historyRoutes = require("./routes/searchHistory");
const favoritesRoutes = require("./routes/favorites");
const port = process.env.PORT || 9000;
//middleware
app.use(express.json());
app.use(cors());
app.use("/api",userRoutes);
app.use("/api",reportsRoutes);
app.use("/api",offersRoutes);
app.use("/api",propertiesRoutes);
app.use("/api",preferenceRoutes);
app.use("/api",historyRoutes);
app.use("/api",favoritesRoutes);
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