export default defineEventHandler(async (event) => {
    const res = await fetch('https://gpt.orionyoung.com/api/openai/v1/chat/completions', {
        method: 'POST',
        body: {
            messages: [
                {
                    "role": "user",
                    "content": "你好"
                }
            ],
            model: "gpt-3.5-turbo",
            stream: true,
        },
        headers: {
            Authorization: 'Bearer ak-orionyoung'
        }
    })
    return res
})