<script setup lang="ts">
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import Editor from '@/components/app/editor/Editor.vue';
import { LANGUAGES } from '@/components/app/editor/types';
import { Button } from './ui/button';
import { useEditorStore } from '@/store/editor';
import { storeToRefs } from 'pinia';
import Splitter from '@/sections/splitter.vue';

self.MonacoEnvironment = {
   getWorker: (_: string) => new JSONWorker(),
};

const store = useEditorStore();
const { json } = storeToRefs(store);
const { formatJson } = store;
</script>

<template>
   <p>
      Items <span> {{ Array.isArray(json) ? json.length : 'N/A' }}</span>
   </p>
   <Splitter />
   <div class="flex items-center justify-center content-center gap-2 mx-6">
      <Button class="" @click="formatJson"> Format </Button>
   </div>
   <section class="flex items-center justify-center content-center">
      <div class="h-[80vh] w-4/5">
         <Editor :type="LANGUAGES.json" />
      </div>
   </section>
</template>
