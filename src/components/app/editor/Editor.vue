<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue';
import * as monaco from 'monaco-editor';
import {
   useDebounceFn,
   useLocalStorage,
   useResizeObserver,
} from '@vueuse/core/index.cjs';
import { LANGUAGES, PAYLOAD, STORAGE_NAMES } from './types';

const props = defineProps<{
   type: LANGUAGES;
}>();

const { type } = toRefs(props);

watch(type, () => {
   editor.dispose();
   createEditor();
   editor.trigger('editor', 'editor.action.formatDocument', {});
});

const emit = defineEmits<(e: 'code-change', payload: PAYLOAD) => void>();

const container = ref<HTMLDivElement>();

let editor: monaco.editor.IStandaloneCodeEditor;

const code = useLocalStorage(`${STORAGE_NAMES.CODE}-${type.value}`, '');

onMounted(() => {
   createEditor();
});

let resizer = useResizeObserver(container, () => {
   editor.layout();
});

onUnmounted(() => {
   editor.dispose();
   resizer.stop();
});

function createEditor() {
   if (!container.value) return;
   editor = monaco.editor.create(container.value, {
      language: type.value,
      theme: 'vs-dark',
   });

   if (code.value) {
      editor.setValue(code.value);
   }

   emit('code-change', {
      type: type.value,
      code: code.value,
   });

   editor.onDidChangeModelContent(
      useDebounceFn(() => {
         if (code.value === editor.getValue()) return;
         code.value = editor.getValue();
         emit('code-change', { type: type.value, code: code.value });
      }, 500)
   );
}
</script>

<template>
   <div ref="container" class="w-full h-full"></div>
</template>
