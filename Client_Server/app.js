const express = require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog');
// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://netninja:test1234@cluster0.wseih1d.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err))
// register view engine
 app.set('view engine', 'ejs');

// listen for request
// app.listen(3000);

// app.use((req, res, next)=>{
//     console.log('new request made:');
//     console.log('host', req.hostname);
//     console.log('path', req.path);
//     console.log('method:', req.method);
//     next();
// })

// middleware & static files
app.use(express.static('public')); 
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog',(req, res)=>{
//     const blog = new Blog({
//         title:'new blog 2',
//         snippet:'about about my new blog', 
//         body:'more about my new blog' 
//     })
//     blog.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// app.get('/all-blogs', (req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// app.get('/single-blog',(req,res)=>{
//     Blog.findById('64b1bed44edfa6a3f0946e4d')
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// routes
app.get('/', (req, res) => {
    
    // res.send('<p>home page</p>');
    // res.sendFile('./views/index.html', {root:__dirname});
    // const blogs = [
    //     {title: 'Ronaldo scored a Hat-Trick', snippet: 'Siiiuuuuuuu'},
    //     {title: 'Messi scored a Hat-Trick', snippet: 'gus tus tu'},
    //     {title: 'Maradona scored a Hat-Trick', snippet: 'life is life'},
    // ]
    // res.render('index', {title:'Home', blogs});

    res.redirect('/blogs');
});

// app.use((req, res, next)=>{
//     console.log('in the next middleware');
//     next();
// })

app.get('/about', (req, res) => {
    
    // res.send('<p>about page</p>');
    // res.sendFile('./views/about.html', {root:__dirname});
    res.render('about', {title:'About'});

});

// blog routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs',blogs:result})
    })
    .catch((err) =>{
        console.log(err);
    })
})


app.get('/blogs/create', (req,res) =>{
    res.render('create', {title:'Create a new blog'});
})

// redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})

// 404 page
app.use((req, res)=>{
    // res.status(404).sendFile('./views/404.html', {root:__dirname})
    res.status(404).render('404', {title:'404'});
})