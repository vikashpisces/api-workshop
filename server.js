require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express()
const PORT = process.env.PORT || 8080
const productsRouter = require('./routes/product.js')

async function connectMongo() { 
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING) 
  } catch (err) { 
    if (err) {
      console.log("Error in connecting to mongoose. Details: ", err)
    } else {
      console.log('Connected to the database')
    }
  }
}

connectMongo()
app.use(express.json())

const logger = (req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`)
  next()
};

app.use(logger);
app.use("/products", productsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

app.get("/", (req, res) => {
  res.send('Hello World!!!')
})


