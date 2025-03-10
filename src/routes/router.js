const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const productRouter = require("./product");
const blogRouter = require("./blog")
const commentRouter = require("./comment")
const adminRouter = require("./admin")
const cartRouter = require("./cart")


router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/blog", blogRouter)
router.use("/comment", commentRouter)
router.use("/admin", adminRouter)
router.use("/cart", cartRouter)


module.exports = router;