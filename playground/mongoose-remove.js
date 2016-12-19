const {ObjectID} = require('mongodb'); // This is just required when you need to validate the ObjectID


const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');
const {
    User
} = require('./../server/models/user');

var id = '58574922e447e3191c09b085';

if (!ObjectID.isValid(id)) {
  console.log('ID is not valid');
}


// Todo.remove({}).then((result)=>{ //{} is necessary to remove all
//   console.log(result);
// });


//Todo.findOneAndRemove()
//Todo.findByIdAndremove('someid') and the call back is going to return the todo that was removed






// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos',todos);
// });
//
//
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo',todo);
// });


// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));
