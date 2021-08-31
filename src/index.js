const express=require('express')
const todooseRouter=require('./routers/todoos')
const usersRouter=require('./routers/users')
// var bodyParser = require('body-parser')
require('./db/mongoose')  //DB connection
const app = express()
app.use(express.json())
// app.use(express.urlencoded());
// parse application/json
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));


app.use(todooseRouter)
app.use(usersRouter)
const port = 3000
/////////







app.listen(port,()=>{console.log('Server is running')})