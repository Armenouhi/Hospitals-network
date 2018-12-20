var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Centre = new Schema({
    centreName : String,
    centreOwnerName : String,
    centreEmail : {type : String, unique: true},
    centreOwnerEmail : String,
    centrePassword : String,
    centreAddress : String,
    centrePphone : String,
    centreOwnerPphone : String,
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
});

// Centre.plugin(passportLocalMongoose);

module.exports = mongoose.model('Centre', Centre);