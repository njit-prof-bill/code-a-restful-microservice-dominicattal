const express = require('express');
const app = express();
const port = 3000;
const MinHeap = require('./MinHeap');

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

var users = new Map();
var heap = new MinHeap();
heap.push(0);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users', (req, res) => {
    const {name, email} = req.body;

    let emptyFields = [];
    if (!name)
        emptyFields.push("name");
    if (!email)
        emptyFields.push("email");

    if (emptyFields.length > 0)
        return res.status(400).json({error: "Please fill in all of the fields", emptyFields})

    let min_id = heap.pop();
    if (heap.empty())
        heap.push(min_id + 1);

    let id = String(min_id);
    users.set(id, {"name": name, "email": email})
    return res.status(201).json({"id": id, "name": name, "email": email});
});

app.get('/users/:id', (req, res) => {
    let {id} = req.params;
    let user = users.get(id);
    if (!user)
        return res.status(404).json({error: `User with id ${id} not found`});
    return res.status(200).json({"id": id, "name": user.name, "email": user.email});
});

app.put('/users/:id', (req, res) => {
    let {id} = req.params;
    let user = users.get(id);
    if (!user)
        return res.status(404).json({error: `User with id ${id} not found`});

    const {name, email} = req.body;

    let emptyFields = [];
    if (!name)
        emptyFields.push("name");
    if (!email)
        emptyFields.push("email");

    if (emptyFields.length > 0)
        return res.status(400).json({error: "Please fill in all of the fields", emptyFields})

    let min_id = heap.pop();
    if (heap.empty())
        heap.push(min_id + 1);

    users.set(id, {"name": name, "email": email})
    return res.status(200).json({"id": id, "name": name, "email": email});
});

app.delete('/users/:id', (req, res) => {
    let {id} = req.params;
    let user = users.get(id);
    if (!user)
        return res.status(404).json({error: `User with id ${id} not found`});
    users.delete(id);
    heap.push(parseInt(id));
    return res.status(204).json();
})

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing