import {OpenAI} from "openai-streams";

const runtimeConfig = useRuntimeConfig()
export default defineEventHandler(async (event) => {

    const stream = await OpenAI('chat', {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "你好",
            },

        ],
    }, {
        apiKey: runtimeConfig.apiSecret,
        mode: "raw"
    })
    return chatCompletion.data;
})
