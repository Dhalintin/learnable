import express from  'express'
import mongoose from'mongoose'
import  rootRoute from './routes/index.route'
require('dotenv').config()
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/v1', rootRoute);

mongoose.connect(process.env.MONGODB_URI!)
.then(() => {
    console.log('Connected to the database')
}).catch(() => {
    console.log('There was an error connecting to your database')
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

export default app;