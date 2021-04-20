var mongoose = require('mongoose');

module.exports = mongoose.model('Doctor', {
    email: {type:String, default: ""},
    phone: {type:String, default: "" },
    name: {type:String, default:""},
    address: {type:String, default:""},
    qualification: {type:String, default:""},
    review: {type:String, default:""},
    timings: {type:Object, default:{"timings":[]}}

});