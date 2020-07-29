const express = require('express');
const path= require('path');
const port = 8000;

const db = require('./config/mongoose');
const ToDo = require('./models/contact');  
const app = express();

app.set('view engine ', 'ejs');
app.set('views' , path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));    //for css

var workList= [  //our work-item array
   
]

app.get('/', function(req,res){ //controller for displaying all work

    ToDo.find({}, function(err,works){
     if(err)
     { 
         console.log("Error in fetching from db");
         return;
     }

     return res.render('home.ejs',{
        work_list: works

    });

});

});

app.post('/add', function(req, res){   //adding a task into our array
   ToDo.create({
    description: req.body.description,
    due:req.body.due,
    category:req.body.category

}, function(err, newwork){
    if(err)
    {
        console.log('Error in the work');
        return;
    }
     console.log('**************', newwork); //if no error print the new work in console and go back to the page
     return res.redirect('back'); 
    });
   
});

//deleting a task
app.get('/delete-work', function(req,res){
    //get the id from query
    let id= req.query.id;

    //find work in db using id and deleting it

    ToDo.findByIdAndDelete(id , function(err){
      if(err){
          console.log('Error in deleting the work from db');
          return;
      }
      return res.redirect('back'); //go back to the page if no error

    });

});

app.listen(port, function(err){
   if(err){   //if any error then print it
        console.log(err);
        return;
   }
   console.log('Server running on port : ', port);
});