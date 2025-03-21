const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")
const { authenticate, isAdmin } = require("../middleware/authentication")


router.use(authenticate)


router.get("/", orderController.getUserOrders)


router.get("/details/:orderId", orderController.getOrderById)


router.post("/placeOrder", orderController.createOrderFromCart)


router.put("/status/:orderId", isAdmin, orderController.updateOrderStatus)

// router.post('/placeOrder',authenticate, orderController.placeOrder);

module.exports = router

