/**
 * This is the interaction point between the user and the model
 * once the hint button is clicked. The user will send the model
 * the problem and the hints provided for that problem.
 *
 * From there, the model will break down the problem to the user
 * and incorporate the hints in the solution.
 */

const ollama = require("ollama").default;

let chatConfig = {
    model: "tinyllama",
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
    "Help the user break down the problem into managable parts. Start the explanation with `The problem presented in the title (write problem title here) can be broken down into smaller, manageable parts as follows:`. Then, provide a list of explanations. Step one should always be you breaking down the problem for the user to undersand.";

// let botCommand =
//     "solve the problem for the user and show your steps. Provide the coede in python at the end.";

userInput = "Provide the problem and hints here";

const hintBot = async (title, botQuestion, botHint) => {
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

module.exports = {hintBot};
