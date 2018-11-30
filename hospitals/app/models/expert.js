// ============== app/modelstodo.js ==================================

//=========== load mongoose since we need it to define a model  ========================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Expert = new Schema({
    name :  { type : String , required : true },
    lastname :{type:String,required:true},
    birthday:{type:Date,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    profession:{type:String,required:true},
    workPlace:{type:String,required:true},
    workPhone:{type:Number,required:true},
    image: String,
    mimetype: String
});

module.exports = mongoose.model('expert', Expert);


