const express = require("express");
const uploads = require("../middlewares/multer");
const {
  uploadSingleImage,
  getAllImages,
  getSingleImages,
  uploadMultipleImage,
  updateSingleImage,
  deleteSingleImage,
} = require("../controllers/imageControllers");

const imageRoute = express.Router();

// upload single image
imageRoute.post(
  "/upload-single-image",
  uploads.single("image"),
  uploadSingleImage
);

// upload multiple images
imageRoute.post(
  "/upload-multiple-images",
  uploads.array("images"),
  uploadMultipleImage
);

// get all images
imageRoute.get("/get-all-images", getAllImages);

// get single image
imageRoute.get("/get-all-images/:id", getSingleImages);

// update single image
imageRoute.put(
  "/update-single-image/:id",
  uploads.single("image"),
  updateSingleImage
);

// update multiple images

// delete single image
imageRoute.delete("/delete-single-image/:id", deleteSingleImage);

module.exports = imageRoute;
