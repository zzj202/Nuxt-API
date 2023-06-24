// import {H3Event, RequestHeaders} from "h3";
// import {CreateChatCompletionRequest} from "openai";
//
// export default defineEventHandler(async (event) => {
//     const headers =getHeaders(event)
//     const body = (await readBody(event)) as CreateChatCompletionRequest;
//     const response = await createChatCompletion(headers, body);
//     setResStatus(event, response.status, response.statusText);
//     return response.data;
// })
//
//
// async function createChatCompletion(
//     headers: RequestHeaders,
//     body: CreateChatCompletionRequest
// ) {
//     const openai = getOpenAIApiInstance("chat", headers, body);
//     return openai.createChatCompletion(body);
// }
// export function setResStatus(event: H3Event, code: number, message: string) {
//     event.node.res.statusCode = code;
//     event.node.res.statusMessage = message;
// }
// function getOpenAIApiInstance(
//     model: ApiRequestModel,
//     headers: RequestHeaders,
//     body?: ApiRequest
// ) {
//     const configuration = createOpenAIConfiguration(model, headers, body);
//     const axiosInstance = createAxiosInstance();
//     return new OpenAIApi(configuration, undefined, axiosInstance);
// }
