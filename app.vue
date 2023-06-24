<template>
  <div>
    {{content}}
  </div>
  <button @click="handle">处理</button>
</template>


<script setup lang="ts">

const content= ref("")
const handle =async () => {
  const { status, statusText, body } = await fetch('/api/v1', {
    method:'post',
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
  console.log(status, statusText,body)
  const reader = body?.getReader();
  const textDecoder = new TextDecoder();
  while (1) {
    const {done, value} = await reader.read()
    if (done) {
      break;
    }
    console.log(value)
    const str = textDecoder.decode(value)
    console.log(str)
    content.value += str
  }
}

</script>