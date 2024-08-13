/**
 * routes to handle the chat bot
 */

const express = require("express");
const router = express.Router();
const {chatBot} = require("../services/chatBot");
const path = require("path");

router.post("^/$|/chat", async (req, res) => {
    const message = req.body.title;

    if (!message || !message.title || !message.question) {
        return res.status(400).send({error: "Title and question are required"});
    }

    const title = message.title;
    const question = message.question;
    const hint = message.hint;
    const conversation = message.conversation;

    if (!message) {
        return res.status(400).send({error: "Chat is required"});
    }
    try {
        const response = await chatBot(title, question, hint, conversation);
        res.send({answer: response});
    } catch (error) {
        res.status(500).send({error: "Error processing your question"});
    }
});

module.exports = router;
