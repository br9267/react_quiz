const express = require('express');
const cors = require('cors');
const mariadb = require('mariadb');
const app = express();
//https://getstream.io/chat/react-chat/tutorial/
app.use(cors());
app.use(express.json());


const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ritcroatia',
    database: 'quiz'
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
app.listen(3001,() => {
    console.log("Running from port 3001");});
