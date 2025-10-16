const exress = require("express");
const { PORT } = require("./secret");
const connectDB = require("./config/db");
const cors = require("cors");
const productRoute = require("./routes/productRoutes");
const { errorResponse } = require("./controllers/responseControllers");
const createError = require("http-errors");
const imageRoute = require("./routes/imageRoutes");

const app = exress();

app.use(cors());
app.use(exress.json());
app.use(exress.urlencoded({ extended: true }));

app.use("/api/products", productRoute);
app.use("/api/images", imageRoute);

app.use((req, res, next) => {
  next(createError(404, "Route Not Found"));
});

app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.statusCode,
    message: err.message,
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  await connectDB();
});
