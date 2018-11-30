// ============== app/modelstodo.js ==================================

//=========== load mongoose since we need it to define a model  ========================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
    text :  { type : String , required : true },
    done : Boolean
});

module.exports = mongoose.model('Todo', Todo);


