/**
 * routes to handle the solution bot
 */

const express = require("express");
const router = express.Router();
const {hintBot} = require("../services/hintBot");
const path = require("path");

router.post("^/$|/hint-problem", async (req, res) => {
    const title = req.body.title;
    const question = req.body.question;
    const answer = req.body.answer;

    console.log("hintBot");

    if (!question) {
        return res.status(400).send({error: "Question is required"});
    }
    try {
        const response = await hintBot(title, question, answer);
        res.send({answer: response});
    } catch (error) {
        res.status(500).send({error: "Error processing your question"});
    }
});

module.exports = router;
