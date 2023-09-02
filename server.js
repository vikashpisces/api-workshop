const express = require('express');
const app = express()
const PORT = 8080

const products = require('./products.json')

app.use(express.json())

const logger = (req, res, next) => {
  console.log(`Received ${req.method} request on ${req.url}`)
  next()
};

app.use(logger);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

app.get("/", (req, res) => {
  res.send('Hello World!!!')
})

app.get("/products", (req, res) => {
  res.json(products)
})

app.get("/products/:id", (req, res) => {
  const { id } = req.params
  const product = products.find((product) => product.id === +id)
  if (!product) {
    return res.status(404).send('Product not found')
  }
  res.json(product)
})

app.post("/products", (req, res) => {
  const product = req.body
  product.id = products.length + 1
  products.push(product)
  res.send('Product created')
})

app.put("/products/:id", (req, res) => {
  const { id } = req.params
  const product = products.find((product) => product.id === +id)
  if (!product) {
    return res.status(404).send('Product not found')
  }
  Object.assign(product, req.body)
  res.send('Product updated')
})

app.delete("/products/:id", (req, res) => {
  const { id } = req.params
  const product = products.find((product) => product.id === +id)
  if (!product) {
    return res.status(404).send('Product not found')
  }
  const index = products.indexOf(product)
  products.splice(index, 1)
  res.send('Product deleted')
})
