const express = require('express'); 
const path = require('path'); // node module for paths

// custom imports
const routes = require('./controllers'); // controllers folder - routes
// to use if we create custom helpers
const helpers = require('./utils/helpers'); 


// express middleware for sessions and for handlebars
const session = require('express-session'); 
const exphbs = require('express-handlebars'); 


// import sequelize and set up db connection 
const sequelize = require('./config/connections'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store); 

// create instance of express
const app = express();

const PORT = process.env.PORT || 3001; 

// create instance of handlebars (add { helpers } if needed)
const hbs = exphbs.create( { helpers } );


const sess = {
    // signs the session id cookie - should be encrypted, ideally, but we haven't done this in class yet
    secret: 'benrodriguezmoranmegansargentkylejohsnonbeccalee', 
    cookie: {
        maxAge: 300000, // max "age" of cookie - 900000 ms (5 min)
        httpOnly: true, // restrict cookie access to HTTP requests
        secure: false, // should set to true when deploying
        sameSite: 'strict', // cookie sharing only for same-site requests
    },
    // resave false, save uninitialized true:
    // save 'uninitialized sessions' (e.g. guest user), does not resave sessions with no new activity, 
    // so there won't be duplicate identical sessions in the database
    resave: false, // prevents session from being saved to the store if data is unmodified 
    saveUninitialized: true, // stores session data even if it's 'uninitialized' - unmodified but new 
    store: new SequelizeStore({
        db: sequelize, // store session data in sequelize 
    }),
};


app.use(session(sess));

// set up handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// use the defined routes
app.use(routes);

// syncing the models with the db and start app
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});