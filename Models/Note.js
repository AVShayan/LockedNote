const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const noteSchema = new Schema( {
    user_id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Note',noteSchema);
/* Example data:-
    ID    :  1
    Title :  ExpressJS
    Body  :  ExpressJS sits on top of NodeJS and helps us
             to create RESTful APIs . I plan to master
             ExpressJS by this month end. */