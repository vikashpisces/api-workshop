const express = require('express');
const router = express.Router()

const products = require('../products.json')

router.get("/", (req, res) => {
  res.json(products)
})

router.get("/:id", (req, res) => {
  const { id } = req.params
  const product = products.find((product) => product.id === +id)
  if (!product) {
    return res.status(404).send('Product not found')
  }
  res.json(product)
})

router.post("/", (req, res) => {
  const product = req.body
  product.id = products.length + 1
  products.push(product)
  res.send('Product created')
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
