import {H3Event, RequestHeaders} from "h3";
import {
    Configuration,
    CreateChatCompletionRequest,
    CreateCompletionRequest,
    CreateImageRequest,
    OpenAIApi
} from "openai";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {OpenAIStream, streamToResponse} from 'ai'
import {OpenAI} from "openai-streams";

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    // const headers = getHeaders(event)
    // const body = (await readBody(event)) as CreateChatCompletionRequest;

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
    const reader = stream.getReader()
    return new Promise((resolve, reject) => {
        function read() {
            reader.read().then(({done, value}) => {
                if (done) {
                    event.node.res.end()
                    return
                }
                event.node.res.write(value)
                read()
            })
        }

        read()
    })

})
