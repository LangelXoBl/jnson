<template>
   <div class="editor-container" ref="editorContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import * as monaco from 'monaco-editor';
import { useEditorStore } from '@/store/editor';

const editorContainer = ref<HTMLDivElement>();
const store = useEditorStore();
const { setEditorInstance } = store;
let editor: monaco.editor.IStandaloneCodeEditor;

onMounted(() => {
   if (!editorContainer.value) return;
   // Crea el editor
   editor = monaco.editor.create(editorContainer.value, {
      value: store.content,
      language: 'json',
      theme: 'vs-dark',
      automaticLayout: true,
   });

   // Actualiza el store cuando se edita
   editor.onDidChangeModelContent(() => {
      store.setContent(editor.getValue());
   });

   setEditorInstance(editor);
});

// Sincroniza el editor si el contenido cambia externamente
watch(
   () => store.content,
   (newContent) => {
      if (editor && newContent !== editor.getValue()) {
         updateContent(newContent);
      }
   }
);

function updateContent(newValue: string) {
   if (!editor) return;
   // Actualiza el texto sin perder historial
   editor.executeEdits('mi-origen', [
      {
         range: editor.getModel()?.getFullModelRange()!,
         text: newValue,
         forceMoveMarkers: true,
      },
   ]);

   // Opcional: Mover el cursor al inicio
   editor.setPosition({ lineNumber: 1, column: 1 });
}
</script>

<style scoped>
.editor-container {
   width: 100%;
   height: 500px;
   border: 1px solid #ccc;
}
</style>
