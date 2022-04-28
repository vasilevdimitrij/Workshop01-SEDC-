const router = require("express").Router();
const DishController = require("../controllers/dish.controller");



router.get("/:id?", (req, res) => {
  if (req.params && req.params.id) {
    
    const itemId = req.params.id;
    dishController
      .fetchDishItemById(itemId)
      .then((item) => {
        res.status(200).json(item);
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  } else {
    dishController
      .fetchAllDishItems()
      .then((items) => {
        res.status(200).json(items);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }
});

router.post("/", (req, res) => {
  const item = req.body;
  dishController.postDishItem(item).then((response) => {
    res.status(200).json(response);
  });
});

router.delete("/:id?", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({
      message: "Error! You didn't provide an ID!",
    });
  } else {
    dishController.deleteDishItem(id).then((response) => {
      res.status(200).json(response);
    });
  }
});

router.put("/:id?", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  if (!itemId || !updatedItem) {
    res.status(400).json({
      message: "Insufficient data! Cannot update!",
    });
  } else {
    dishController
      .updateDishItem(itemId, updatedItem)
      .then((response) => {
        res.status(200).json(response);
      });
  }
});

const dishController = new DishController();
module.exports = router;