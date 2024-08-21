/**
 * Allows us to interface with the Maizey API while
 * avoiding CORS issues.
 */

const express = require("express");
const router = express.Router();
const {postNewMessage} = require("../services/maizeyChat");

router.post("^/$|/message", async (req, res) => {
    const {convoId, description, input} = req.body;
    if (!convoId || !input) {
        return res
            .status(400)
            .send({error: "Conversation ID and message are required"});
    }

    try {
        const response = await postNewMessage(convoId, input);
        res.send(response);
    } catch (error) {
        res.status(500).send({error: "Error posting message"});
    }
});

module.exports = router;
