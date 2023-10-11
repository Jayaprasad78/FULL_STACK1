const mongoose = require('mongoose');
const db=process.env.DATABASE;
mongoose.connect(db,{  writeConcern: { w: 'majority' }}).then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log('error connecting to database');
    console.log(err.message);
})


