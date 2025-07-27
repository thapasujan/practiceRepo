import { users } from './userController.js';

const sessions = {};

export const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const sessionId = Date.now().toString();
        sessions[sessionId] = user;
        res.json({ sessionId, message: 'Login successful' });
    } else {
        res.send('Invalid credentials');
    }
};
