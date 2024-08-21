/**
 * Allows us to interface with the Maizey API while
 * avoiding CORS issues.
 */

const express = require("express");
const router = express.Router();
const {postNewConversation} = require("../services/maizeyChat");

router.post("^/$|/convo", async (req, res) => {
    try {
        const convoId = await postNewConversation();
        res.send({convoId: convoId});
    } catch (error) {
        res.status(500).send({error: "Error creating conversation"});
    }
});

module.exports = router;
