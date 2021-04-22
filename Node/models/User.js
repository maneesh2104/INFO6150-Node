var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email: {type:String, default: ""},
    phone: {type:String, default: "" },
    first_name: {type:String, default:""},
    last_name: {type:String, default:""},
    password: {type:String, default:""}
});

