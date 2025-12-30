const express = require("express");
const router = express.Router();
const db = require("../db");

// Save Score
router.post("/save", (req, res) => {
    const { user_id, wpm, accuracy, errors, test_time } = req.body;
    db.query("INSERT INTO scores (user_id,wpm,accuracy,errors,test_time) VALUES (?,?,?,?,?)",
        [user_id, wpm, accuracy, errors, test_time],
        (err, result) => {
            if(err) return res.status(500).send(err);
            res.send("Score Saved Successfully");
        });
});

// Get User Score History
router.get("/history/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    db.query("SELECT * FROM scores WHERE user_id=? ORDER BY date DESC", [user_id], (err, results) => {
        if(err) return res.status(500).send(err);
        res.send(results);
    });
});

module.exports = router;
