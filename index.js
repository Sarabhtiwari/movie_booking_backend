const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const MovieRoutes = require('./routes/movie.route') 


env.config()
const app = express() //express object


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

MovieRoutes(app);  //invoking movie routes

app.listen(process.env.PORT, async () => {
    // as we successfully start the server this callback gets executed
    console.log(`server started at port ${process.env.PORT}`)

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('successfully connected to mongo db')
    } catch (error) {
        console.log('not able to connect to mongodb',error)
    }
})