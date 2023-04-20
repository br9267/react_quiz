const {connect} = require('getstream');
const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');
const StreamChat = require('stream-chat').StreamChat;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET_KEY);
const token_duration = Math.floor(Date.now() / 1000) + (60 * 60);
app.post("/register", async (req,res) => {
    try{
        const {username,email,password} = req.body;
        const user_id = uuidv4();
        const password_hash = await bcrypt.hash(password, 10);
        const token = client.createToken(user_id,token_duration);
        res.status(200).json({token,user_id,username,email,password_hash});
    }catch(err){
        res.status(400).json(err);
    }
});

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ritcroatia',
    database: 'SECURE_PROJECT'
});

app.get('/trivia',(req,res) => {
    pool.getConnection()
        .then(conn => { 
            conn.query("SELECT * FROM trivia")
                .then(data => {
                    conn.release(); 
                    res.json(data);
                })
                .catch(err => {
                    conn.release(); 
                    res.status(500).json({error: err});
                });
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

app.post("/signup", async (req, res) => {
    try{
    const {username,password} = req.body;
    const {users} = await client.queryUsers({name:username});
    if(users.length === 0){
        return res.status(204).json(`No users found under the username ${username}`);
    };
    
    const token = client.createToken(users[0].id,token_duration);

    const password_test = bcrypt.compare(password, users[0].password_hash);

    if (password_test){
        res.status(200).json({
            token,user_id:users[0].id, username, email: users[0].email, password_hash:users[0].password_hash
        });
    };

    }catch(err){
        res.status(400).json(err);
    }
});

app.listen(process.env.PORT,() => {
    console.log(`Running from port ${process.env.PORT}`);});
