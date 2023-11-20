const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {
    NewProduct,
    GetProducts
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
router.get('/products', GetProducts)

// router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin',), upload.array('images', 10), newProduct);
router.post('/admin/product/new', NewProduct);


module.exports = router;