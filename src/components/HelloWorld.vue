<script setup lang="ts">
import { ref } from 'vue'
import Button from './ui/button/Button.vue';
defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="p-8">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a class="font-medium text-blue-400 decoration-inherit hover:text-blue-500" href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
    class="font-medium text-blue-400 decoration-inherit hover:text-blue-500"
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="text-gray-400">Click on the Vite and Vue logos to learn more</p>
  <Button size="lg"> Click me </Button>
</template>

