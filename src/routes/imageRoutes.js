const express = require("express");
const uploads = require("../middlewares/multer");
const {
  uploadImage,
  getAllImages,
} = require("../controllers/imageControllers");

const imageRoute = express.Router();

imageRoute.post("/upload-image", uploads.single("image"), uploadImage);
imageRoute.get("/all-images", getAllImages);

module.exports = imageRoute;
