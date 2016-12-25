const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb'); // This is just required when you need to validate the ObjectID


var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

//Todos

app.post('/todos', (req, res) => {
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })

});


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (err) => {
        res.status(400).send(err);
    });
});


app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({
            todo
        });

    }).catch((e) => {
        res.status(400).send()
    });
});


app.delete('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({
            todo
        });

    }).catch((e) => {
        res.status(400).send()
    });
});

app.patch('/todos/:id', (req, res) => {

    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    console.log(body);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
        //body.completed = true;
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    console.log('Body after ', body);

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});


//Users

//POST users
app.post('/users', (req, res) => {
    //console.log(req.body);

    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        //res.send(user); // this is where the user was sent back before we had the concept of tokens
    }).then((token) => {
      res.header('x-auth', token).send(user);
        //res.send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.listen(port, () => {
    console.log(`Started app on port ${port}`);
})
