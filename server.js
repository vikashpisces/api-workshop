require('dotenv').config();
const express = require('express');
const app = express()
const PORT = process.env.PORT || 8080
const productsRouter = require('./routes/product.js')

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


