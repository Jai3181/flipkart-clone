const Product = require("../models/Product")
const slugify = require("slugify")

exports.createProduct = (req, res) => {
  // res.status(200).json({ file: req.files, body: req.body })
  const { name, price, description, category, quantity } = req.body
  let productPictures = []
  if (req.files.length > 0) {
    productPictures = req.files.map(file => {
      return { img: file.filename }
    })
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price: price,
    description: description,
    productPictures,
    category: category,
    quantity: quantity,
    createdBy: req.user._id
  })
  product.save((errors, product) => {
    if (errors) { return res.status(400).json(errors) }
    if (product) { return res.status(200).json(product) }
  })
}