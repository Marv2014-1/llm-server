/**
 * Enable the User to send messages with mistral model
 * This is mainly here for testing purposes
 *
 * Is able to send a string to the model and recive a string back
 */

const ollama = require("ollama");

const chatBot = async (message) => {
    try {
        const response = await ollama.chat({
            model: "mistral",
            messages: [{role: "user", content: message}],
        });

        return response.message.content;
    } catch (err) {
        console.log(err);
        return {error: "Failed to get response from model"};
    }
};

module.exports = {chatBot};
