require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "unity",
});

db.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
    }
});

//config JSON response
app.use(express.json());

app.get('/', (re, res) => {
    return res.json("From Backend");
})

app.post('/user/register', async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    const user = `SELECT * FROM users WHERE username = "${username}";`
    db.query(user, (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) { 
            return res.json('Já existe, ultilize outro nome');
        }
    })

    const emails = `SELECT * FROM users WHERE email = "${email}";`
    db.query(emails, (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) { 
            return res.json('Já existe, ultilize outro email');
        }
    })

    //validations
    if (!username) {
        return res.status(422).json({ mgs: "O nome é obrigatório!" });
    }

    if (!email) {
        return res.status(422).json({ mgs: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ mgs: "O password é obrigatório!" });
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ mgs: "As senhas tem que ser iguais" });
    }

    //create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create User
    const createUser = `INSERT INTO users (username, email, password, level, coin) VALUES ('${username}', '${email}', '${passwordHash}', 1, 0)`;
    db.query(createUser, (err, data) => {
        if (err) return res.json(err);
        return res.status(201).json({msg: "Usuário criado com sucesso!"});
    })
})


app.post('/user/login', async (req, res) => {
    const { username, password } = req.body;

    const user = `SELECT * FROM users WHERE username = "${username}";`
    db.query(user, (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) { 
            return res.json('Logado com sucesso!');
        }
    })

    const checkPassword = `SELECT * FROM users WHERE password = "${password}";`
    db.query(checkPassword, (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) { 
            return res.json('Logado com sucesso!');
        }
    })

    const secret = process.env.SECRET

    const token = jwt.sign(
        {
            username: username,
        },
        secret,
    )

    console.log(token);

    res.status(200).json({msg: "Usuário logado com sucesso!", token})
})



app.listen(8081, () => {
    console.log('listening');
})