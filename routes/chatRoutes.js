/**
 * routes to handle the chat bot
 */

const express = require("express");
const router = express.Router();
const {chatBot} = require("../services/llm");
const path = require("path");

router
    .get("^/$|/llm(.html)?", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "views", "llm-test.html"));
    })
    .post("^/$|/llm-test(.html)?", async (req, res) => {
        console.log(req.body);
        const {message} = req.body;
        if (!message) {
            return res.status(400).send({error: "Question is required"});
        }
        try {
            const response = await chatBot(message);
            res.send({answer: response});
        } catch (error) {
            res.status(500).send({error: "Error processing your question"});
        }
    });

module.exports = router;
