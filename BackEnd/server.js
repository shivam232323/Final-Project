const express = require('express');
const pool = require('./database');
const router = require('./Routes/route');
const PORT = '1800';
const cors  = require('cors');

const app = new express();

app.use(express.json());

let corsOptions = {
    origin: '*' // Compliant
};
   
app.use(cors(corsOptions));
  
   

app.use(router);


app.listen(PORT,()=>
{
    console.log(`Listening at port ${PORT} successfully`);
})

