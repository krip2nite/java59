import userAccountService from "../services/userAccount.service.js";

class UserAccountController {
    async register(req, res, next) {
        try {
            const userAccount = await userAccountService.register(req.body);
            res.status(201).json(userAccount);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        const userAccount = await userAccountService.getUser(req.principal.username);
        res.json(userAccount);
    }

    async deleteUser(req, res, next) {
        try {
            const userAccount = await userAccountService.removeUser(req.params.user);
            res.json(userAccount);
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const userAccount = await userAccountService.updateUser(req.params.user, req.body);
            res.json(userAccount);
        } catch (err) {
            next(err);
        }
    }

    async addRole(req, res, next) {
        const {user, role} = req.params;
        try {
            const userRoles = await userAccountService.changeRoles(user, role, true);
            res.json(userRoles);
        } catch (err) {
            next(err);
        }
    }

    async deleteRole(req, res, next) {
        const {user, role} = req.params;
        try {
            const userRoles = await userAccountService.changeRoles(user, role, false);
            res.json(userRoles);
        } catch (err) {
            next(err);
        }
    }

    async changePassword(req, res, next) {
        await userAccountService.changePassword(req.principal.username, req.headers['x-password']);
        res.sendStatus(204);
    }

    async getUser(req, res, next) {
        try {
            const userAccount = await userAccountService.getUser(req.params.user);
            res.json(userAccount);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserAccountController();