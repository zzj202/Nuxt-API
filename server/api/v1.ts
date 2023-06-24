
import {Configuration, OpenAIApi} from "openai";
const runtimeConfig =useRuntimeConfig()
export default defineEventHandler(async (event) => {
    const configuration = new Configuration({
        apiKey: runtimeConfig.apiSecret
    });
    const openai = new OpenAIApi(configuration);
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "写一篇关于如何使用 OpenAI API 的文章"}],
        stream: true,
    });
    return chatCompletion.data;
})

