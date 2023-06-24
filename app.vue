<template>
  <div>
    {{ content }}
  </div>
  <button @click="handle">处理</button>

</template>


<script setup lang="ts">



const runtimeConfig = useRuntimeConfig()
const content = ref("")
const handle = async () => {
  console.log(runtimeConfig.public.apiBase)
  const res = await $fetch('https://api.openai.com/v1/chat/completions', {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + 'sk-69T6IRXe1xLXzO2t' + 'Onl2T3BlbkFJO02e3c5YoTxeiQt66fAu',
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: '你好',
        },
      ],
      stream: true,
    })
  })
  console.log(res)
  // console.log(status, statusText, body)
  // const reader = body?.getReader();
  // const textDecoder = new TextDecoder();
  // while (1) {
  //   const {done, value} = await reader.read()
  //   if (done) {
  //     break;
  //   }
  //   console.log(value)
  //   const str = textDecoder.decode(value)
  //   console.log(str)
  //   content.value += str
  // }
}


</script>