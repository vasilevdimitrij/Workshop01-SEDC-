const textService = require("../textService");
const { v4: uuidv4 } = require("uuid");

class DishModel {
  
  getAllDishItems() {
    return new Promise((resolve, reject) => {
      const text = textService.readDataFromDb("dish.json");
      if (!text) {
        reject({
          message: "No data available!",
        });
      }
      resolve(JSON.parse(text));
    });
  }

  getDishItemById(itemId) {
    return new Promise((resolve, reject) => {
      const text = textService.readDataFromDb("dish.json");
      const data = JSON.parse(text);
      const item = data.dish.filter((item) => item.id === itemId)[0];

    

      if (item) {
        resolve(item);
      } else {
        reject({
          message: "Error! No such item found!",
        });
      }
    });
  }

  insertNewDishItem(item) {
    return new Promise((resolve, reject) => {
      item.id = uuidv4();
      const dbDataText = textService.readDataFromDb("dish.json");
      const dbData = JSON.parse(dbDataText);
      dbData.inventory.push(item);
      const dbDataStringified = JSON.stringify(dbData);
      textService.writeDataToDb("dish.json", dbDataStringified);
      resolve({
        message: "Item sucessefully added!",
      });
    });
  }

  deleteDishItem(itemId) {
    return new Promise((resolve, reject) => {
      const dbDataText = textService.readDataFromDb("dish.json");
      const dbData = JSON.parse(dbDataText);

      const filtered = dbData.inventory.filter((item) => item.id !== itemId);

      dbData.dish = filtered;

      const dbDataStringified = JSON.stringify(dbData);
      textService.writeDataToDb("dish.json", dbDataStringified);

      resolve({
        message: `Item ${itemId} successfully deleted!`,
      });
    });
  }

  putDishItem(id, body) {
    return new Promise((resolve, reject) => {
      const dbDataText = textService.readDataFromDb("dish.json");
      const dbData = JSON.parse(dbDataText);

      dbData.dish.forEach((item) => {
        if (item.id === id) {
          item.price = body.price;
          item.title = body.title;
        }
      });

      const stringifiedData = JSON.stringify(dbData);
      textService.writeDataToDb("dish.json", stringifiedData);

      resolve({
        message: `Item ${id} was updated!`,
      })
    });
  }
}

module.exports = DishModel;