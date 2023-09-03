const express = require('express');
const router = express.Router()

const Product = require('../models/product.js')

router.get("/", async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) {
    return res.status(404).send('Product not found')
  }
  res.json(product)
})

router.post("/", async (req, res) => {
  const product = req.body
  const newProduct = await Product.create(product)
  res.send(newProduct)
})

router.put("/:id", (req, res) => {
  const { id } = req.params
  const product = products.find((product) => product.id === +id)
  if (!product) {
    return res.status(404).send('Product not found')
  }
  Object.assign(product, req.body)
  res.send('Product updated')
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  const product = products.find((product) => product.id === +id)
  if (!product) {
    return res.status(404).send('Product not found')
  }
  const index = products.indexOf(product)
  products.splice(index, 1)
  res.send('Product deleted')
})

module.exports = router
