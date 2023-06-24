import {H3Event, RequestHeaders} from "h3";
import {
    Configuration,
    CreateChatCompletionRequest,
    CreateCompletionRequest,
    CreateImageRequest,
    OpenAIApi
} from "openai";

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const runtimeConfig =useRuntimeConfig()

export default defineEventHandler(async (event) => {
    // const headers = getHeaders(event)
    // const body = (await readBody(event)) as CreateChatCompletionRequest;

    const axiosInstance = createAxiosInstance();
    const openai = new OpenAIApi({
        apiKey: runtimeConfig.apiSecret
    },undefined,axiosInstance);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "写一篇关于如何使用 OpenAI API 的文章"}],
        stream: true,
    });
    setResStatus(event, response.status, response.statusText);
    return response.data;
})






async function createChatCompletion(
    headers: RequestHeaders,
    body: CreateChatCompletionRequest
) {
    const openai = getOpenAIApiInstance("chat", headers, body);
    return openai.createChatCompletion(body);
}

export function setResStatus(event: H3Event, code: number, message: string) {
    event.node.res.statusCode = code;
    event.node.res.statusMessage = message;
}

function getOpenAIApiInstance(
    model: ApiRequestModel,
    headers: RequestHeaders,
    body?: ApiRequest
) {
    const configuration = new Configuration({
        apiKey: runtimeConfig.apiSecret
    })
    const axiosInstance = createAxiosInstance();
    return new OpenAIApi(configuration, undefined, axiosInstance);
}

type ApiRequestModel = "models" | "chat" | "text" | "img";
type ApiRequest =
    | CreateChatCompletionRequest
    | CreateCompletionRequest
    | CreateImageRequest;


function createOpenAIConfiguration(
    model: ApiRequestModel,
    headers: RequestHeaders,
    body?: ApiRequest
) {
    const useEnv = runtimeConfig.public.useEnv === "yes";


    // Identify the model ID of the Azure OpenAI Service from the OpenAI model name
    let azureDeploymentId = "";
    if (model === "chat") {
        switch ((body as CreateChatCompletionRequest).model as ChatModel) {
            case "gpt-3.5-turbo":
                azureDeploymentId = azureGpt35DeploymentId;
                break;
            case "gpt-4":
                azureDeploymentId = azureGpt4DeploymentId;
                break;
        }
    } else if (model === "text") {
        // TODO: Support completion model
    } else if (model === "img") {
        azureDeploymentId = azureDalleDeploymentId;
    }

    const azureOptions =
        apiType === "azure"
            ? {
                basePath: `${apiHost}/openai/deployments/${azureDeploymentId}`,
                baseOptions: {
                    headers: { "api-key": apiKey },
                    params: {
                        "api-version": azureApiVersion,
                    },
                },
            }
            : {};

    return new Configuration({
        apiKey,
        ...azureOptions,
    });
}


function createAxiosInstance() {
    const axiosRequestConfig: AxiosRequestConfig = {
        responseType: "stream",
        timeout: 1000 * 20,
        timeoutErrorMessage: "**Network connection timed out. Please try again**",
        // 使用代理，配置参考 https://axios-http.com/docs/req_config
        // proxy: {
        //   protocol: "http",
        //   host: "127.0.0.1",
        //   port: 7890,
        // },
    };

    function onRequest(config: AxiosRequestConfig) {
        return config;
    }

    function onResponse(response: AxiosResponse) {
        return response;
    }

    function onRequestError(error: any) {

        return error;
    }

    function onResponseError(error: any) {

        return error.response;
    }

    const axiosInstance = axios.create(axiosRequestConfig);
    axiosInstance.interceptors.request.use(
        (config) => onRequest(config) || config
    );
    axiosInstance.interceptors.response.use(
        (response) => onResponse(response) || response
    );
    axiosInstance.interceptors.request.use(
        undefined,
        (error) => onRequestError(error) || Promise.reject(error)
    );
    axiosInstance.interceptors.response.use(
        undefined,
        (error) => onResponseError(error) || Promise.reject(error)
    );

    return axiosInstance;
}
