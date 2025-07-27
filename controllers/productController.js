let products = [
    { id: 1, name: 'Laptop', price: 999.99, stock: 10 },
    { id: 2, name: 'Phone', price: 699.99, stock: 5 }
];

export const createProduct = (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock
    };
    products.push(newProduct);
    res.json(newProduct);
};

export const searchProducts = (req, res) => {
    const searchTerm = req.query.q;
    const results = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.json(results);
};
