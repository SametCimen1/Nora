const express  = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const bcrypt = require('bcrypt');
const pool = require('./Pool');
var jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors());
// app.use(cors({origin:'http://localhost:3000', credentials: true}))
app.use(cookieParser());
app.disable('x-powered-by');
app.use(function(req, res) {
    // Website you wish to allow to connect
 
})

app.get('/', (req,res) =>{
    res.json(req.cookies);
})

app.get('/welcome', (req,res)=>{
    console.log(req.cookies)
    res.send("welcome")
})


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
        // CREATE TOKEN
        const token = jwt.sign({
            data: {userId:user.id, userEmail: user.email}
          }, 'secret', { expiresIn: '1h' });

        user.token = token;
        res.cookie('token', token, {maxAge: 60*60*24*7, httpOnly: true})
        res.status(201).json(user)

    } catch (error) {
        console.log(error)
    }
})

app.post("/login", async(req,res) =>{
    
    try {
        const {name, password} = req.body;
        if (!(name && password)) {
            res.status(400).send("All input is required");
          }
        //CHECK IF USER EXIST;
        const user = await pool.query(`SELECT * FROM users WHERE users.name = '${name}'`);
        if (user && (await bcrypt.compare(password, user.rows[0].password))) {
            console.log("PASSWORD MATCHES")
            // Create token
            const token = jwt.sign({
                data: {userId:user.id, userEmail: user.email}
              }, 'secret', { expiresIn: '1h' });
      
            // save user token
            user.token = token;
            res.cookie('token', token, {maxAge: 60*60*24*7, httpOnly: true})
            // user
            res.status(200).json(user);
          }
          else{
              console.log("something went wrong")
              res.json("something went wrong")
          }

    } catch (error) {
        
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})