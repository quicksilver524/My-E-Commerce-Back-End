const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// gets all developed products
router.get("/", (req, res) => {
  // finds all products
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        model: Tag,
        attributes: ["id", "tag_name"],
        through: ProductTag,
        as: "product_tags",
      },
    ],
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: "No products found" });
        return;
      }

      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single product
router.get("/:id", (req, res) => {
  // finds a single product by its id
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"],
      },
      {
        model: Tag,
        attributes: ["id", "tag_name"],
        through: ProductTag,
        as: "product_tags",
      },
    ],
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: "No products found at this id" });
        return;
      }

      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// creates new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// updating a product
router.put("/:id", (req, res) => {
  // updates a products data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // all associated tags from product tag data
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // lists current tag ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // creates filtered list of new tag ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      // removes tags from product
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // deletes one product by its id
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(404).json({ message: "No product found at this id" });
        return;
      }

      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
