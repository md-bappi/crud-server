const mongooese = require("mongoose");

const imageSchema = new mongooese.Schema(
  {
    path: {
      type: String,
      required: true,
      trim: true,
    },
    filename: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Image = mongooese.model("Image", imageSchema);

module.exports = Image;
