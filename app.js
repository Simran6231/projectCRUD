require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride=require('method-override');
//const flash=require('express-flash-message');
const flash = require('connect-flash'); 
const session=require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = process.env.PORT || 5003;

//connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Static Files
app.use(express.static('public'));

//express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  })
);

//flash messages
//app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(flash());



// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//ROUTES
app.use('/',require('./server/routes/customer'))




// Handle 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});


app.listen(port, ()=>{
  console.log(`app listening on port ${port}`)
})