const mongoose = require('mongoose');

const PostSchmea = mongoose.Schema({
  
    article : {
        type : String
    },
    author : {
        type: String
    },
    subject : {
        type: String
    },
    createdAt : {
        type: Date,
        default :Date.now
    }
});

module.exports = mongoose.model('Posts',PostSchmea);