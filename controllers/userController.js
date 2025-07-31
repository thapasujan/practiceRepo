export const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: '123456' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password' }
];

export const getAllUsers = (req, res) => {
    res.json(users);
};

export const createUser = (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser);
    res.json(newUser);
};

export const getUserById = (req, res) => {
    const userId = req.params.id;
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    console.log('Executing query:', query);

    const user = users.find(u => u.id == userId);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    res.json(user);
};

export const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id == userId);

    if (userIndex === -1) {
        res.status(404).send('User not found');
        return
    }

    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
};

export const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    users.splice(userIndex, 1);
    res.send('User deleted');
};
