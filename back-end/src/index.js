const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/user");
const reportsRoutes = require("./routes/report");
const offersRoutes = require("./routes/offer");
const propertiesRoutes = require("./routes/property");
const preferenceRoutes = require("./routes/preference");
const historyRoutes = require("./routes/searchHistory");
const favoritesRoutes = require("./routes/favorites");
const MessageRoutes = require("./routes/message");
const notificationRoutes = require("./routes/notification");
const port = process.env.PORT || 9000;
const path = require('path');
const fs = require('fs').promises;

  const storage = multer.memoryStorage();
  
  const upload = multer({ storage: storage });
  cloudinary.config({
    cloud_name: 'dvbkm3c9q',
    api_key: '699787534656799',
    api_secret: 'xHfAE4tOWuDSy5Lnrdy9T52J_R8'
  });
  
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
app.use("/api",MessageRoutes);
app.use("/api",notificationRoutes);
//routes


app.post('/upload', upload.array('images'), async (req, res) => {
    try {

      const tempDir = path.join(__dirname, 'temp');
      
      // Asegúrate de que el directorio temporal exista
      await fs.mkdir(tempDir, { recursive: true });

      const uploadedImages = await Promise.all(req.files.map(async (file) => {
        const tempFilePath = path.join(tempDir, file.originalname);
        await fs.writeFile(tempFilePath, file.buffer);

        const result = await cloudinary.uploader.upload(tempFilePath, {
          folder: 'IntercambioPropiedades',
        });

        await fs.unlink(tempFilePath);

        return result.secure_url;
      }));
      res.json(uploadedImages);
    } catch (error) {
      console.error('Error al cargar imágenes:', error);
      res.status(500).json({ error: 'Error al cargar imágenes' });
    }
});



  

app.get("/",(req,res)=>{
    res.send("Welcome to the api");
});
//Connect base de datos
mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log("Conectado a la base de datos"))
.catch((error)=>console.log(error));
app.listen(port,() => console.log("Server listen on port",port));