const Image = require("../models/imageModel");
const path = require("path");
const { successResponse, errorResponse } = require("./responseControllers");

// upload single image
const uploadImage = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newImage = new Image({
      url: path.join("/src/uploads/", file.filename),
      title,
      description,
    });

    await newImage.save();

    return successResponse(res, {
      statusCode: 201,
      message: "Image uploaded successfully",
      payload: newImage,
    });
  } catch (error) {
    console.error(error);
  }
};

// get all images
const getAllImages = async (req, res, next) => {
  try {
    const images = await Image.find({});

    if (images.length === 0) {
      return errorResponse(res, {
        statusCode: 404,
        message: "No images found",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Images retrieved successfully",
      payload: images,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  uploadImage,
  getAllImages,
};
