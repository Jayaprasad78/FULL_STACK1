const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
app.use(cookieParser());
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
app.use(express.static('public'));
app.use(cors());
const port=process.env.PORT;

require('./db/conn');
require('./userschema/userschema');
app.use(express.json());
app.use(require('./router/auth'));




// app.get('/about',(req,res)=>{
//     res.send('About page');
// });







app.listen(port,()=>{
    console.log(`server listening on port ${port} `);
});