//MONGODB PASSWORD: RVDhaf34IMTnrHQ9
//MONGODB CONNECTION: mongodb+srv://Antonio:<password>@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

//OWASP
const toobusy = require('toobusy-js');
const contentType = require('content-type')
const getRawBody = require('raw-body')
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));
const rateLimit = require('express-rate-limit');
const apiRequestLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 minute
    max: 100 // limit each IP to 2 requests per windowMs
});
app.use(apiRequestLimiter);
const hpp = require('hpp');
app.use(hpp());

const hsts = require('hsts')
const sixtyDaysInSeconds = 5184000
app.use(hsts({
  maxAge: sixtyDaysInSeconds,
  includeSubDomains: false
}))

const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    key: 'cookieName',
    cookie: { secure: true, httpOnly: true, path: '/user', sameSite: true},
    resave: true,
    saveUninitialized: true
}));


//Internal modules
const saucesRoutes = require('./routes/routes');
const userRoutes =  require('./routes/user');


app.use((req, res, next) => {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
    }
    
  });

mongoose.connect('mongodb+srv://Antonio:RVDhaf34IMTnrHQ9@cluster0.5oksa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then (() => {
        console.log('Sucessfully connected to MongoDB!')
    })
    .catch(() => {
        console.log('Unable to connect to MongoDB!')
        console.error(error);
    });
    
app.use(express.json());
//app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

app.listen(3000, () => {
    console.log("Server Listening")
  })