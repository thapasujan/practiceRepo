import express from "express";
const app = express();

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: '123456' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password' }
];

let products = [
    { id: 1, name: 'Laptop', price: 999.99, stock: 10 },
    { id: 2, name: 'Phone', price: 699.99, stock: 5 }
];

app.get('/', (req, res) => {
    res.send('Welcome to our API!');
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser);
    res.json(newUser);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id == userId);
    if (!user) {
        res.status(404).send('User not found');
        return;
    }
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id = userId);

    if (userIndex === -1) {
        res.send('User not found');
    }

    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    users.splice(userIndex, 1);
    res.send('User deleted');
});

app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };
    products.push(newProduct);
    res.json(newProduct);
});

app.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    const results = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.json(results);
});

app.get('/heavy-task', (req, res) => {
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
        result += i;
    }
    res.json({ result });
});

const sessions = {};
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const sessionId = Date.now().toString();
        sessions[sessionId] = user;
        res.json({ sessionId, message: 'Login successful' });
    } else {
        res.send('Invalid credentials');
    }
});

app.get('/api/data', (req, res) => {
    res.json({ data: 'This will fail from browser due to CORS' });
});

app.get('/async-data', async (req, res) => {
    try {
        const data = await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve({ message: 'Success!' });
                } else {
                    reject(new Error('Random failure'));
                }
            }, 1000);
        });
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});