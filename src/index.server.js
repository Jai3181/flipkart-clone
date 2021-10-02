// imports
const express = require("express");
const env = require("dotenv");
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

//mongoose connect
mongoose.connect(`mongodb+srv://root:admin@cluster0.pd2lx.mongodb.net/flipkart?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log(`DATABASE CONNECT to ${process.env.MONGO_DB_USER} ${process.env.MONGO_DB_PASSWORD} ${process.env.MONGO_DB_DATABASE}`)
  });

//using variables
env.config()

//routes
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin/auth")

//middlewares
app.use(express.json())
app.use("/api", authRoutes)
app.use("/api", adminRoutes)

//listener
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});