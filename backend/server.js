const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');
const StreamChat = require('stream-chat').StreamChat
const { v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json());

const key = 'kbe3j74y8kyd';
const secret_key = '5h5u4r54r8te59v63bm7rxugwqwm76gxyeah64mgnvam82c42r9af62npgw6bv5h';
const client = StreamChat.getInstance(key,secret_key);


app.post("/register", async (req,res) => {
    try{
        const {username,email,password} = req.body;
        const user_id = uuidv5();
        const password_hash = await bcrypt.hash(password, 10);
        const token = client.createToken(user_id);
        res.status(201).json({token,user_id,username,email,password_hash});
    }catch(err){
        res.json(err);
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

app.post("/handleLogin", async (req, res) => {
    try{
    const {email,password} = req.body;
    const {users} = await client.queryUsers({name:email});
    }catch(err){
        res.json(err);
    }
});

app.listen(3001,() => {
    console.log("Running from port 3001");});
