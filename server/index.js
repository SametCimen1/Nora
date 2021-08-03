const express  = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const bcrypt = require('bcrypt');
const pool = require('./Pool');
var jwt = require('jsonwebtoken');


app.post("/register", async(req,res) =>{

    try {
        const {name,first_name, last_name, email, password} = req.body
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }
        //CHECK IF USER ALREADY EXIST;

        //ENCRYPT PASSWORD
        const encryptedPassword = await bcrypt.hash(password, 10);
        
        //CREATE USER IN DB WITH THE encryptesPassword 
         const today = new Date().toISOString().split('T')[0];
        console.log(today)
        
         const user = await pool.query(`INSERT INTO users (name, first_name, last_name, email, password, joined, words,streak) VALUES ('${name}', '${first_name}', '${last_name}', '${email}', '${encryptedPassword}',' ${today}', 0, 0) RETURNING *`);
         console.log(user.rows[0])
        //CREATE TOKEN
        const token = jwt.sign({
            data: {userId:user.id, userEmail: user.email}
          }, 'secret', { expiresIn: '1h' });
        user.token = token;
        res.status(201).json(user)

    } catch (error) {
        console.log(error)
    }
})

app.post("/login", async(req,res) =>{
    try {
        const {name, password} = req.body;
    } catch (error) {
        
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})