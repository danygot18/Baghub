const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { registerUser, LoginUser, Logout, ForgotPassword, ResetPassword } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.post('/register', upload.single("avatar"), registerUser);
router.post('/login', LoginUser);
router.get('/logout', Logout);

router.post('/forgot', ForgotPassword);
router.put('/password/reset/:token', ResetPassword);


module.exports = router;