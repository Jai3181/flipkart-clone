const Category = require("../models/category")
const slugify = require("slugify");

function createCategories(categories, parentId = null) {
  const categoryList = []
  let category
  if (parentId == null) {
    category = categories.filter(cat => cat.parentId == undefined)
  } else {
    category = categories.filter(cat => cat.parentId == parentId)
  }
  category.map(cate => {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id)
    });
  })
  return categoryList
}

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name)
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId
  }
  const cat = new Category(categoryObj)
  cat.save((errors, category) => {
    if (errors) { return res.status(400).json({ errors }) }
    if (category) { return res.status(200).json({ category }) }
  })
}

exports.getCategories = (req, res) => {
  Category.find({})
    .exec((errors, categories) => {
      if (errors) { return res.status(400).json({ errors }) }
      if (categories) {
        const categoryList = createCategories(categories)
        res.status(200).json({ categoryList })
        // res.status(200).json({ categories })
      }
    })
}