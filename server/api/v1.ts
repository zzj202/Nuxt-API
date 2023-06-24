
import {Configuration, CreateChatCompletionRequest, OpenAIApi} from "openai";
const runtimeConfig =useRuntimeConfig()
export default defineEventHandler(async (event) => {
    const headers =getHeaders(event)
    const body = (await readBody(event)) as CreateChatCompletionRequest;


    const configuration = new Configuration({
        apiKey: runtimeConfig.apiSecret
    });
    const openai = new OpenAIApi(configuration);
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "你好"}],
        stream: true,
    });
    return chatCompletion.data;
})
