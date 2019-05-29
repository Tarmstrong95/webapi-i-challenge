// implement your API here
const express = require('express');

const server = express();
server.use(express.json());

const db = require('./data/db')

server.post('/api/users', (req, res) => {
if (!req.body.name || !req.body.bio){
    res.status(400).json({errorMessage: "Please provide name and bio for the user."})
}else{
    db.insert(req.body)
    .then(body => {
        res.status(201).json(req.body)
    })
    .catch(err => {
        res.status(500).json({ERROR: "there was an error saving the user to the database."})
    })
}

})


server.get('/api/users', (req, res) => {
db.find()
.then(list => {
    res.json(list)
})
.catch(err => {
    res.status(500).json({error: "the users information could not be retrieved"})
})
})


server.get('/api/users/:id', (req, res) => {
    
    db.findById(req.params.id)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    })
})
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(del => {
        if(del){
            res.status(200).json({status: "success"})
        }
        else{
            res.status(404).json({message: "user with id no exist"})
        }
    })
    .catch(err => {
        res.status(500).json({ERROR: "the user no remove"})
    })
})
server.put('/api/users/:id', (req, res) => {
    if(!req.body.name || !req.body.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for user."})
    }else{
        db.update(req.params.id, req.body)
        .then(item => {
            if(item){
                res.status(200).json(req.body)
            }else{
                res.status(404).json({message: "the user with id does not exist."})
            }
        }).catch(err => {
            res.status(500).json({error: "the user could not be found"})
        })
    }
})

server.listen(8000, () => {
    console.log('listening on port 8000')
})