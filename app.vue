<template>
  <div>
    <button @click="handleV1">v1</button>
    <button @click="handleV2">v2</button>
    <button @click="handleV3">v3</button>
    <button @click="handleCompletions">completions</button>
    <button @click="handleM1">m1</button>
    <button @click="handleM2">m2</button>
  </div>


</template>


<script setup lang="ts">
const handleV1 = () => {
  $fetch('/api/v1', {
    method: 'POST',
  })
}
const handleV2 = () => {
  $fetch('/api/v2', {
    method: 'POST',
  })
}
const handleV3 = () => {
  $fetch('/api/v3', {
    method: 'POST',
  })
}
const handleCompletions = () => {
  $fetch('/api/completions', {
    method: 'POST',
  })
}

const handleM1 = () => {
  $fetch('/api/m1', {
    method: 'POST',
  })
}

const handleM2 = async () => {
  const res = await $fetch('/api/m2', {
    method: 'POST',
  })
  console.log(res)
  console.log(res.data)
}

</script>