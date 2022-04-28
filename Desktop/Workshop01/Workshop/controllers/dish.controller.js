const DishModel = require("../models/dish.model");
const dishModel = new DishModel();

class DishController {
  fetchAlldishItems() {
    return dishModel.getAlldishItems();
  }

  fetchdishItemById(itemId) {
    return dishModel.getdishItemById(itemId);
  }

  postdishItem(item) {
    return dishModel.insertNewdishItem(item);
  }

  deletedishItem(itemId) {
    return dishModel.deletedishItem(itemId);
  }

  updatedsihItem(id, body) {
    return dishModel.putdishItem(id, body);
  }
}

module.exports = DishController;