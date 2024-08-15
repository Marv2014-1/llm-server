/**
 * routes to handle the chat bot
 */

const express = require("express");
const router = express.Router();
const {chatBot} = require("../services/chatBot");
const path = require("path");
const { con } = require("pos/lexicon");

router.post("^/$|/chat", async (req, res) => {
    console.log(req.body.payload);
    const message = req.body.payload.payload;

    if (!message || !message.title || !message.question) {
        return res.status(400).send({error: "Title and question are required"});
    }

    const title = message.title;
    const question = message.question;
    const hint = message.hint;
    const conversation = message.conversation;

    try {
        const response = await chatBot(title, question, hint, conversation);
        res.send({answer: response});
    } catch (error) {
        res.status(500).send({error: "Error processing your question"});
    }
});

module.exports = router;
