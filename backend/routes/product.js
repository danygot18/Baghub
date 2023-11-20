const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {
    NewProduct,
    GetProducts,
    getAdminProducts,
    deleteProduct
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
router.get('/products', GetProducts)
router.get('/admin/products',isAuthenticatedUser, getAdminProducts);

// router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin',), upload.array('images', 10), newProduct);
router.post('/admin/product/new',upload.array('images'), NewProduct);
router.delete('/admin/product/:id', deleteProduct);


module.exports = router;