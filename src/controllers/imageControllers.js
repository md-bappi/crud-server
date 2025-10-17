const Image = require("../models/imageModel");
const path = require("path");
const { successResponse, errorResponse } = require("./responseControllers");
const fs = require("fs").promises;

// upload single image
const uploadSingleImage = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please upload a file",
      });
    }

    const image = new Image({
      path: file.path,
      filename: file.filename,
    });
    await image.save();

    return successResponse(res, {
      statusCode: 200,
      message: "Image uploaded successfully",
      payload: {
        image,
      },
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, {
      statusCode: 500,
      message: "Error uploading image",
    });
  }
};

// upload multiple images
const uploadMultipleImage = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please upload a file",
      });
    }

    const imagesArray = files.map((file) => ({
      path: file.path,
      filename: file.filename,
    }));

    const images = await Image.insertMany(imagesArray);

    return successResponse(res, {
      statusCode: 200,
      message: "Image uploaded successfully",
      payload: {
        images,
      },
    });
  } catch (error) {
    console.error(" Error uploading image", error);
  }
};

// get all images
const getSingleImages = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Image ID is required",
      });
    }

    const image = await Image.findById({ _id: id });

    const host = `${req.protocol}://${req.get("host")}`;

    const formattedImage = {
      _id: image._id,
      path: image.path,
      filename: image.filename,
      url: `${host}/uploads/${image.filename}`,
    };

    return successResponse(res, {
      statusCode: 200,
      message: "Image fetched successfully",
      payload: formattedImage,
    });
  } catch (error) {
    console.error(error);
  }
};

const getAllImages = async (req, res, next) => {
  try {
    const images = await Image.find({});

    if (!images) {
      return errorResponse(res, {
        statusCode: 404,
        message: "No images found",
      });
    }

    const host = `${req.protocol}://${req.get("host")}`;

    const formattedImages = images.map((img) => ({
      _id: img._id,
      path: img.path,
      filename: img.filename,
      url: `${host}/uploads/${img.filename}`,
    }));

    return successResponse(res, {
      statusCode: 200,
      message: "Images fetched successfully",
      payload: formattedImages,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateSingleImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;
    console.log(file);
    if (!id) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Image ID is required",
      });
    }

    if (!file) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please upload a file",
      });
    }

    const image = await Image.findById({ _id: id });

    if (!image) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Image not found for update",
      });
    }

    const updatedImage = await Image.findOneAndUpdate(
      { _id: id },
      {
        path: file.path,
        filename: file.filename,
      },
      { new: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Image updated successfully",
      payload: updatedImage,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteSingleImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Image ID is required",
      });
    }

    const imageExist = await Image.findById({ _id: id });
    if (!imageExist) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Image not found for delete",
      });
    }

    const path = imageExist.path;

    fs.access(path)
      .then(() => fs.unlink(path))
      .then(() => console.log("file deleted"))
      .catch((err) => console.log(" image not deleted", err));

    const image = await Image.findByIdAndDelete({ _id: id });

    return successResponse(res, {
      statusCode: 200,
      message: "Image deleted successfully",
      payload: image,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImage,
  getSingleImages,
  getAllImages,
  updateSingleImage,
  deleteSingleImage,
};
