import express from "express";
import userAccountController from "../controller/userAccount.controller.js";
import validate from "../middleware/validation.middleware.js";

const router = express.Router();

router.post('/register', validate('register') , userAccountController.register);
router.post('/login', userAccountController.login);
router.delete('/user/:user', userAccountController.deleteUser);
router.patch('/user/:user', validate('updateUser'), userAccountController.updateUser);
router.patch('/user/:user/role/:role', validate('changeRoles', 'params'), userAccountController.addRole);
router.delete('/user/:user/role/:role', validate('changeRoles', 'params'), userAccountController.deleteRole);
router.patch('/password', userAccountController.changePassword);
router.get('/user/:user', userAccountController.getUser);

export default router;