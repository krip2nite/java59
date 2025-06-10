import userAccountRepository from "../repositories/userAccount.repository.js";

class UserAccountService {
    async register(user) {
        return await userAccountRepository.addUser(user);
    }

    async getUser(login) {
        const userAccount = await userAccountRepository.findUser(login);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async removeUser(login) {
        const userAccount = await userAccountRepository.removeUser(login);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async updateUser(login, user) {
        const userAccount = await userAccountRepository.updateUser(login, user);
        if (!userAccount) {
            throw new Error(`User with login ${login} not found`);
        }
        return userAccount;
    }

    async changeRoles(login, role, isAddRole) {
        let userAccount;
        if (isAddRole) {
            userAccount = await userAccountRepository.addRole(login, role);
        } else {
            userAccount = await userAccountRepository.removeRole(login, role);
        }
        userAccount.firstName = userAccount.lastName = undefined;
        return userAccount;
    }

    async changePassword(login, newPassword) {
        const userAccount = await userAccountRepository.changePassword(login, newPassword);
    }
}

export default new UserAccountService();