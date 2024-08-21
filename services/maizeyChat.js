require("dotenv").config();
const axios = require("axios");

// URL to post a new conversation
const url =
    "https://umgpt.umich.edu/maizey/api/projects/" +
    process.env.PROJECT_PK +
    "/conversation/";

// Headers for the request
const headers = {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TOKEN,
    "Content-Type": "application/json",
};

/**
 * function to post a new conversation, this will return a json containing the conversation pk
 */
const postNewConversation = async () => {
    try {
        const response = await axios.post(url, {}, {headers});
        console.log(response.data.pk);
        return response.data.pk; // Return the response data
    } catch (error) {
        console.error("Error creating conversation:", error);
        throw error; // Re-throw the error if needed
    }
};

/**
 * with the conversation id, we can post a new message to the conversation.
 * This will return a json containing the query and the response, along with
 * the sources it used to generate the response.
 */
const postNewMessage = async (convoId, message) => {
    console.log("convoId: ", convoId);
    console.log("message: ", message);
    const urlMessage = url + convoId + "/messages/";
    console.log("url: ", url);
    try {
        const response = await axios.post(
            urlMessage,
            {query: message},
            {headers}
        );
        return response.data;
    } catch (error) {
        console.error("Error posting message:", error);
        throw error;
    }
};

module.exports = {
    postNewConversation,
    postNewMessage,
};
