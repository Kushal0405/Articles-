const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const cors = require ('cors')
mongoose.connect('mongodb://localhost:27017/article',  { useNewUrlParser: true,useUnifiedTopology: true  }, ()=>{
    console.log('Connected to db')
})

const app = express();

app.use(bodyParser.json());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
  var http = require('http');

  http.createServer(function (request, response) {
  response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  });
  
  });
app.use(cors())
// get all posts
app.get('/' , async (req,res)=>{
const posts = await Post.find();
res.send(posts)
console.log(posts)
})

// get particular post
app.get('/:id', async (req,res)=>{
    const _id = req.params.id
const post = await Post.findById(_id)
  
   res.send(post)
   console.log(post)
});

// // // make a post

app.post('/', (req,res)=>{

    const post = new Post({
       
        article : req.body.article,
        author : req.body.author,
        subject : req.body.subject,
    });
        
        post.save()
        .then(() =>{
            res.send(post)
        })
        .catch(err => console.log(err));
    console.log(post)
    
});

app.delete('/:id' , async (req,res)=>{
    const _id = req.params.id
    const post =  await Post.findByIdAndDelete(_id)
    res.send(post)

    console.log(post)
    res.send(post)
})

app.patch('/:id' , async (req,res)=>{
    const _id = req.params.id
    const post = await Post.findByIdAndUpdate(_id,
        {$set :{
       
        article : req.body.article,
        author : req.body.author,
        subject : req.body.subject,

    }})
    console.log(post)
    res.send(post)
})


app.listen(4000,(err)=>{
    if(!err){
       console.log('runing at port 4000') 
    }
    else{
        console.log('error in listening to port')
    }
})

// // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// const express = require('express');
// const mongoose= require('mongoose');
// const bodyParser = require('body-parser');
// const Post = require('./models/Post');

// mongoose.connect('mongodb://localhost:27017/article',  { useNewUrlParser: true,useUnifiedTopology: true  }, ()=>{
//     console.log('Connected to db')
// })

// const app = express();

// app.use(bodyParser.json());

// app.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
//   });




//  app.use(express.json())


//  app.get('/' , async (req,res)=>{
// const posts = await Post.find();
// res.send(posts)
// console.log(posts)
// })





// app.post('/', (req,res)=>{

//     const post = new Post({
//         _id: req.body._id,
//         article : req.body.article,
//         author : req.body.author,
//         subject : req.body.subject,
//     });
        
//         post.save()
//         .then(() =>{
//             res.send(post)
//         })
//         .catch(err => console.log(err));
//     console.log(post)
    
// });



// app.delete('/:Id' , async (req,res)=>{
//         const _id = req.params.id
//     const post =  await Post.findByIdAndRemove(_id)

//     console.log(post)
// })


// app.patch('/:Id' , async (req,res)=>{
//     const _id = req.params.id

//     const post = await Post.findByIdAndUpdate((_id),{$set :{
//         _id: req.body._id,
//         article : req.body.article,
//         author : req.body.author,
//         subject : req.body.subject,

//     }})
//     console.log(post)
// })




//  app.listen(4000, (req,res)=>{
//      console.log('Server is running on port 4000' )
//  })

