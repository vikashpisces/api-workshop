require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express()
const PORT = process.env.PORT || 8080
const productsRouter = require('./routes/product.js')
const usersRouter = require('./routes/user.js')

async function connectMongo() { 
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING) 
    console.log('Connected to the database')
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

const jwtVerify = (req, res, next) => {
  if (['/users/login', '/users/register'].includes(req.url)) { 
    return next()
  }
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send('Token is missing')
  }
  const decoded = jwt.verify(authHeader, process.env.JWT_SECRET)
  req.user = decoded
  next()
} 

app.use(logger);
app.use(jwtVerify)
app.use("/products", productsRouter)
app.use("/users", usersRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

app.get("/", (req, res) => {
  res.send('Welcome to the workshop')
})


