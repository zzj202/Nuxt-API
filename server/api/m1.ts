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

const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    // const headers = getHeaders(event)
    // const body = (await readBody(event)) as CreateChatCompletionRequest;


    const config = new Configuration({
        // eslint-disable-next-line react-hooks/rules-of-hooks
        apiKey: runtimeConfig.apiSecret
    })
    const openai = new OpenAIApi(config)
    // const { messages } = await readBody(event)
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [{role: "user", content: "你好"}],
    }, {
        headers: {
            'Authorization': 'Bearer ' + runtimeConfig.apiSecret,
        }
    })
    const stream = OpenAIStream(response)
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
