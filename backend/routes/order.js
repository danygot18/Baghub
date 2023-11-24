const express = require('express')
const router = express.Router();

const { newOrder, myOrders, getSingleOrder, adminOrders, deleteOrder, updateOrder, confirm
		
	} = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/admin/orders', isAuthenticatedUser,  adminOrders);
router.delete('/admin/order/:id',isAuthenticatedUser, deleteOrder)
router.put('/admin/order/:id',isAuthenticatedUser, updateOrder)
router.get('/confirm', confirm)



module.exports = router;