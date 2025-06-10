import UserAccount from '../models/userAccount.model.js';

const authentication = async (req, res, next) => {
    if(req.path !== '/account/register') {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Basic ')) {
            return res.status(401).send('Authentication required');
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [login, password] = credentials.split(':');
        const userAccount =await UserAccount.findById(login);
        if (!userAccount || !(await userAccount.comparePassword(password))) {
            return res.status(401).send('Invalid Credentials');
        }
        req.principal = {username: login, roles: userAccount.roles};
    }
    next();
}

export default authentication;