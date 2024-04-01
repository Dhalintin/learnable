import http from 'http';
import app from './app'

const port = process.env.PORT || 3000

// const server = http.createServer(app);
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
// server.listen(port, ()=>{
//     console.log(`Listening on port ${port}`)
// });