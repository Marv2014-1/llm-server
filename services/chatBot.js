/**
 * This maintains a conversation between the user and the model.
 * The model is provided a question and the answer, as well as the user instructions.
 */

const { cons, chat } = require("pos/lexicon");

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
    ],
    stream: true,
    temperature: 0.5,
};

let chatConfigReset = {
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
    ],
    stream: true,
    temperature: 0.5,
};

let botCommand =
    "The user will ask you a question about the problem they are viewing. Provide a detailed explanation about what the user is asking. If the user asks for a hint, provide a hint. If the user asks for the answer, provide the answer. If the user asks for the code, provide the code. If the user asks for a solution, provide the solution. If the user asks for a step-by-step solution, provide a step-by-step solution";

const chatBot = async (title, botQuestion, botHint, conversation) => {
    try {
        chatConfig.messages[0].content = "Problem title:" + title;
        chatConfig.messages[1].content = "Problem: " + botQuestion;
        if (!botHint == undefined) {
            chatConfig.messages[2].content = "Hint/Solution:" + botHint;
        }
        chatConfig.messages[3].content = "Assistant instructions:" + botCommand;

        // Process the conversation array. Undefin
        if (conversation != undefined) {
            for (let i = 0; i < conversation.length; i++) {
                const role = i % 2 === 0 ? "user" : "assistant";
                chatConfig.messages.push({
                    role: conversation[i].role,
                    content: conversation[i].content,
                });

                console.log(chatConfig.messages);
                console.log("conversation: " + conversation[i].content);
                console.log("role: " + conversation[i].role);
                console.log("i: " + i);
            }
        }

        const output = await invokeMistral();

        chatConfig = chatConfigReset;
        
        return output;
    } catch (err) {
        console.log(err);
        chatConfig = chatConfigReset;
        return {error: "Failed to get response from model"};
    }
};

const invokeMistral = async () => {
    try {
        const response = await ollama.chat(chatConfig);
        let output = "";

        for await (const chunk of response) {
            output += chunk.message.content;
        }

        return output;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {chatBot};
