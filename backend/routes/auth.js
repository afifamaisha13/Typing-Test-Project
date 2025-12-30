const express = require("express");
const router = express.Router();
const db = require("../db");

// Register
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err) return res.status(500).send(err);
        if(result.length > 0) return res.status(400).send("Email already exists");

        db.query("INSERT INTO users (name,email,password) VALUES (?,?,?)",
            [name, email, password],
            (err, result) => {
                if(err) return res.status(500).send(err);
                res.send("Registration Successful");
            });
    });
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email=? AND password=?", [email,password], (err, result) => {
        if(err) return res.status(500).send(err);
        if(result.length === 0) return res.status(400).send("Invalid Credentials");
        res.send({ message: "Login Successful", user: result[0] });
    });
});

module.exports = router;
