const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({  //creting our schema
       //paramters in db
    description : {
        type : String,   
        required: true
    },
    category : {
        type : String,
        required : true
    },
    due : {
        type : String,
        required : true
    }
});


const ToDo = mongoose.model('ToDo', todoSchema); 

module.exports= ToDo;  //exporting