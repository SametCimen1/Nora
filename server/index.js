const express  = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());


app.post("/register", (req,res) =>{

})

app.post("/login", (req,res) =>{
    
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})