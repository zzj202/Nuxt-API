
import {Configuration, OpenAIApi} from "openai";
import {H3Event} from "h3";
const runtimeConfig =useRuntimeConfig()
export default defineEventHandler(async (event) => {
    const configuration = new Configuration({
        apiKey: runtimeConfig.apiSecret
    });
    const openai = new OpenAIApi(configuration);
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "你好"}],
        stream: true,
    });
    setResStatus(event, response.status, response.statusText);
    return chatCompletion.data;
})

function setResStatus(event: H3Event, code: number, message: string) {
    event.node.res.statusCode = code;
    event.node.res.statusMessage = message;
}