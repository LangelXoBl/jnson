<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue';
import * as monaco from 'monaco-editor';
import {
   useDebounceFn,
   useLocalStorage,
   useResizeObserver,
} from '@vueuse/core/index.cjs';
import { LANGUAGES, STORAGE_NAMES } from './types';
import Button from '@/components/ui/button/Button.vue';

const props = defineProps<{
   type: LANGUAGES;
}>();

const { type } = toRefs(props);

// const emit = defineEmits<(e: 'code-change', payload: PAYLOAD) => void>();

const model = defineModel<string>();
const container = ref<HTMLDivElement>();

let editor: monaco.editor.IStandaloneCodeEditor;

const code = useLocalStorage(`${STORAGE_NAMES.CODE}-${type.value}`, '');

watch(model, (value) => {
   editor.setValue(value ?? '');
});

onMounted(() => {
   createEditor();
});

const resizer = useResizeObserver(container, () => {
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

   // emit('code-change', {
   //    type: type.value,
   //    code: code.value,
   // });

   editor.onDidChangeModelContent(
      useDebounceFn(() => {
         const newValue = editor.getValue();
         if (code.value === newValue) return;
         code.value = isCodeSizeValid(newValue) ? newValue : code.value;
         model.value = newValue;
      }, 500)
   );
}

// valid if the code size is greater than supported local storage size
function isCodeSizeValid(text: string) {
   return text.length < 5e6;
}

function formatCode() {
   editor.trigger('editor', 'editor.action.formatDocument', {});
}
</script>

<template>
   <Button class="" @click="formatCode"> Format </Button>
   <div ref="container" class="w-full h-full"></div>
</template>
