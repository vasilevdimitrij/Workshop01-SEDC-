const express = require('express')
const cors = require("cors");
const router = require("./router.const");
const app = express()

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use("/api", router);

app.use("/subapi", (req, res, next) => {
  const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const filteredArray = numberArray.filter((number) => {
    if (number === 15) {
      return true;
    } else {
      return false;
    }
  });
  const result = {
    filteredArray,
    message: "This is your filtered array.",
  };
  res.status(200).json(result);
});

app.listen(PORT, HOST, () => {
  console.log("Server is listening at http://localhost:3000/");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running at port: ${PORT}`);
});