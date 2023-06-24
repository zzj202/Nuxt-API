<template>
  <div>
    <button @click="handleV1">v1</button>
    <button @click="handleV2">v2</button>
    <button @click="handleV3">v3</button>
    <button @click="handleCompletions">completions</button>
  </div>


</template>


<script setup lang="ts">
const handleV1 = () => {
  $fetch('/api/v1',{
    method: 'POST',
  })
}
const handleV2 = () => {
  $fetch('/api/v2',{
    method: 'POST',
  })
}
const handleV3 = () => {
  $fetch('/api/v3',{
    method: 'POST',
  })
}
const handleCompletions=()=>{
  $fetch('/api/completions',{
    method: 'POST',
  })
}


</script>