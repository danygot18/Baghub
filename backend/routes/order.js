const express = require('express')
const router = express.Router();

const { newOrder, myOrders, getSingleOrder, adminOrders, deleteOrder, updateOrder, confirm,
	totalOrders, totalSales, customerSales,salesPerMonth
		
	} = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/orders/me', isAuthenticatedUser, myOrders);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);

router.get('/admin/orders', isAuthenticatedUser,authorizeRoles("admin"),  adminOrders);
router.delete('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"), deleteOrder)
router.put('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"), updateOrder)
router.get('/confirm', confirm)

router.get('/admin/total-orders', totalOrders);
router.get('/admin/total-sales', totalSales);
router.get('/admin/customer-sales', customerSales);
router.get('/admin/sales-per-month', salesPerMonth);




module.exports = router;