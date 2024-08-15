const { cons, chat, con } = require("pos/lexicon");
const ollama = require("ollama").default;

// Define the default chat configuration
const defaultChatConfig = {
    model: "tinyllama",
    messages: [
        { role: "system", content: "Problem title: " },
        { role: "system", content: "question: " },
        { role: "system", content: "Hint/Solution: Not Provided" },
        { role: "system", content: "botCommand: " },
    ],
    stream: true,
    temperature: 0.5,
};

let botCommand = "The user will ask you a question about the problem they are viewing. Provide a detailed explanation about what the user is asking. If the user asks for a hint, provide a hint. If the user asks for the answer, provide the answer. If the user asks for the code, provide the code. If the user asks for a solution, provide the solution. If the user asks for a step-by-step solution, provide a step-by-step solution";

const chatBot = async (title, botQuestion, botHint, conversation) => {
    try {
        // Create a new chat configuration object based on default values
        let chatConfig = JSON.parse(JSON.stringify(defaultChatConfig));

        // Update chatConfig with new values
        chatConfig.messages[0].content = "Problem title: " + title;
        chatConfig.messages[1].content = "Problem: " + botQuestion;
        if (botHint !== undefined) {
            chatConfig.messages[2].content = "Hint/Solution: " + botHint;
        }
        chatConfig.messages[3].content = "botCommand: " + botCommand;

        // Process the conversation array if provided
        if (conversation !== undefined) {
            for (let i = 0; i < conversation.length; i++) {
                chatConfig.messages.push({
                    role: conversation[i].role,
                    content: conversation[i].content,
                });
            }
        }

        console.log("Chat Configuration:", chatConfig);

        const output = await invokeMistral(chatConfig);

        console.log("Output:", output);

        return output;
    } catch (err) {
        console.error("Error:", err);
        
        return { error: "Failed to get response from model" };
    }
};

const invokeMistral = async (chatConfig) => {
    try {
        const response = await ollama.chat(chatConfig);
        let output = "";

        for await (const chunk of response) {
            output += chunk.message.content;
        }

        return output;
    } catch (error) {
        console.error("Invoke Error:", error);
    }
};

module.exports = { chatBot };
