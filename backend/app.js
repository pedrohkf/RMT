
app.get('/users', (req, res) => {
    const users = "SELECT * FROM users";
    db.query(users, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/items', (req, res) => {
    const items = "SELECT * from items";
    db.query(items, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/userItemsID', (req, res) => {
    const userId = req.query.userID;
    const userItems = `Select items. * from useritems 
    INNER JOIN items ON useritems.itemID = items.ID 
    Where useritems.userID = ${userId};`;

    db.query(userItems, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})