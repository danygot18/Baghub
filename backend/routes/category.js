const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {
    NewCategory,
    GetCategory,
    deleteCategory,
    updateCategory,
    getSingleCategory,GetAdminCategory

} = require('../controllers/categoryController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/admin/category/new', isAuthenticatedUser,authorizeRoles("admin"), upload.array('images'), NewCategory);
router.get('/admin/category/:id',isAuthenticatedUser,authorizeRoles("admin"), getSingleCategory);
router.get('/admin/categories', isAuthenticatedUser,authorizeRoles("admin"), GetAdminCategory);
router.put('/admin/category/update/:id', isAuthenticatedUser,authorizeRoles("admin"),  upload.array('images'), updateCategory);
router.delete('/admin/category/:id',isAuthenticatedUser,authorizeRoles("admin"),  deleteCategory );

router.get('/categories', GetCategory );


module.exports = router;