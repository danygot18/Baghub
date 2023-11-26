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
    getAdminProductsShow,
    productSales
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
router.get('/products', GetProducts);
router.get('/admin/products',isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.get('/admin/products/show',isAuthenticatedUser, authorizeRoles("admin"), getAdminProductsShow);
router.get('/products/:id', getSingleProduct);


// router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin',), upload.array('images', 10), newProduct);
router.post('/admin/product/new',isAuthenticatedUser, authorizeRoles("admin"),upload.array('images'), NewProduct);
router.delete('/admin/product/:id',isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.put('/admin/product/update/:id', isAuthenticatedUser, authorizeRoles("admin"), upload.array('images'), updateProduct);

router.get('/admin/product-sales', productSales);




module.exports = router;