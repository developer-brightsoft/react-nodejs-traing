const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRote = require('./router/auth')
const atmRote = require('./router/atm')
require('dotenv/config');


const app = express();
app.use(express.json({extended: true}))
app.use(cors());

app.use('/api/v1/auth', authRote)
app.use('/api/v1/atms', atmRote)

mongoose.connect( 
    process.env.DB_CONNECTION  
    ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log(`successfully connected`); 
    })
    .catch((e)=>{
            console.log(e);
    });


app.get('/', (req, res) => {
    res.send('home page')
})

const PORT = process.env.ENV_PORT
app.listen(PORT, (req, res) => {
    console.log(`app listen to port ${PORT}`)
})