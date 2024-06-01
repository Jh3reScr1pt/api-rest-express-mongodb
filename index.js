const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

const userRoute = require("./routes/user.route.js");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database!");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });
