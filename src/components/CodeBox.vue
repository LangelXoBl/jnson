<script setup lang="ts">
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import Editor from '@/components/app/editor/Editor.vue';
import { LANGUAGES, type PAYLOAD } from '@/components/app/editor/types';
import { ref } from 'vue';
import { Button } from './ui/button';

const jsCode = ref('');
const splitRange = ref({ start: 0, end: 0 });

function onChange(payload: PAYLOAD) {
   try {
      console.log(payload);
      jsCode.value = JSON.parse(payload.code);
      if (Array.isArray(jsCode.value)) {
         splitRange.value.end = jsCode.value.length;
      }
   } catch (e) {
      console.log(e);
   }
}
function splitItems() {
   const { start, end } = splitRange.value;
   jsCode.value = jsCode.value.slice(start, end);
}

self.MonacoEnvironment = {
   getWorker(_: string) {
      return new JSONWorker();
   },
};
</script>

<template>
   <p>
      Items <span> {{ Array.isArray(jsCode) ? jsCode.length : 'N/A' }}</span>
   </p>
   <p>Splite items</p>
   <input type="text" v-model="splitRange.start" />
   <input type="text" v-model="splitRange.end" />
   <Button @click="splitItems">Split</Button>
   <Editor
      class="w-full h-full"
      v-model="jsCode"
      :type="LANGUAGES.json"
      @code-change="onChange"
   />
</template>
