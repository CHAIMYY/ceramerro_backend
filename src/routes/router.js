const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const productRouter = require("./product");
const blogRouter = require("./blog")

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/blog", blogRouter)


module.exports = router;