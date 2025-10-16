const mongooese = require("mongoose");

const imageSchema = new mongooese.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Image = mongooese.model("Image", imageSchema);

module.exports = Image;
