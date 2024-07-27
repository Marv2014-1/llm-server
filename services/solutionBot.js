/**
 * This robot isprompted with solving the problemforthe user
 * and showing them the steps to the solution. At the end, a code
 * sample is provided in python.
 */

const ollama = require("ollama").default;

let chatConfig = {
    model: "mistral",
    messages: [
        {
            role: "system",
            content: "Problem title: ",
        },
        {
            role: "system",
            content: "question: ",
        },
        {
            role: "system",
            content: "answer: ",
        },
        {
            role: "system",
            content: "botCommand: ",
        },
        {
            role: "user",
            content: "userInput",
        },
    ],
    stream: true,
    temperature: 0.5,
};

let botCommand =
    "solve the problem for the user and show your steps. Provide the coede in python at the end.";

userInput = "Show me how to do it";

const solutionBot = async (title, botQuestion, botHint) => {
    try {
        chatConfig.messages[0].content = title;
        chatConfig.messages[1].content = botQuestion;
        if (!botHint == undefined) {
            chatConfig.messages[2].content = botHint;
        }
        chatConfig.messages[3].content = botCommand;
        chatConfig.messages[4].content = userInput;

        const output = await invokeMistral();
        return output;
    } catch (err) {
        console.log(err);
        return {error: "Failed to get response from model"};
    }
};

const invokeMistral = async () => {
    try {
        let response = await ollama.chat(chatConfig);
        let output = "";

        for await (const chunk of response) {
            output += chunk.message.content;
        }

        return output;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {solutionBot};
