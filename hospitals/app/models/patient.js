// ============== app/modelstodo.js ==================================

//=========== load mongoose since we need it to define a model  ========================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Patient = new Schema({
    fullname :  { type : String , required : true },
    phone :  { type : String , required : true },
    username :  { type : String , required : true },
    expert : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert'
    },
    password :  { type : String , required : true },
    animals :  { type : String , required : true },
    address :  { type : String , required : true },
    count :  { type : Number , required : true },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('patient', Patient);


