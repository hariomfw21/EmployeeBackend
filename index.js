const express = require('express');
const { connection } = require('./connection/connection');
const { register } = require('./routes/register');
const { login } = require('./routes/login');
const cors = require('cors');
const { employee } = require('./routes/employee');
const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome");
    console.log('welcome route');
})

app.use('/',register);
app.use("/",login);
app.use("/",employee);

app.listen(3000,async()=>{
    try {
        await connection
        console.log('aap is conneted to database');
        console.log('listening on port 3000');
    } catch (error) {
        console.log('error: ' + error);
    }
})