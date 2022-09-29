import express from 'express';
import { users } from '../config/users';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/constants';

const authRouter = express.Router();

authRouter.post('/api/auth/login', (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    const expiresIn = 1000 * 60 * 60 * 24;

    if(!user) {
        return res.status(400)
            .json({ success: false, message: 'Authentication failed'});
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn });

    res.cookie('connect.jit', token, {
        maxAge: expiresIn, httpOnly: true
    });

    return res.json({
        success: true,
        access_token: token
    })
});

export default authRouter;
