const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {
    NewProduct,
    GetProducts,
    getAdminProducts,
    deleteProduct,
    updateProduct,
    getSingleProduct,
    getAdminProductsShow
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
router.get('/products', GetProducts);
router.get('/admin/products', isAuthenticatedUser,authorizeRoles("admin"), getAdminProducts);
router.get('/admin/products/show', isAuthenticatedUser,authorizeRoles("admin"), getAdminProductsShow);
router.get('/products/:id', getSingleProduct);


// router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin',), upload.array('images', 10), newProduct);
router.post('/admin/product/new',upload.array('images'), NewProduct);
router.delete('/admin/product/:id', deleteProduct);
router.put('/admin/product/update/:id', upload.array('images'), updateProduct);


module.exports = router;