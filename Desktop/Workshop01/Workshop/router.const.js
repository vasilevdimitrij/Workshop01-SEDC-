const router = require('express').Router();
const dish = require("./dish.json");


router.use("/dish", dish);

module.exports = router;