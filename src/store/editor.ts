import { defineStore } from 'pinia';
import * as monaco from 'monaco-editor';
import { computed, ref } from 'vue';

type editorType = monaco.editor.IStandaloneCodeEditor;

export const useEditorStore = defineStore('counter', () => {
   const editorInstance = ref<editorType>();
   const content = ref('');
   const json = computed(() => {
      try {
         return JSON.parse(content.value);
      } catch (error) {
         console.log(error);
         return null;
      }
   });

   function setEditorInstance(editor: editorType) {
      editorInstance.value = editor;
   }

   // Funcion para formatear el json
   function formatJson() {
      editorInstance.value?.trigger('editor', 'editor.action.formatDocument', {});
   }

   function setContent(text: string) {
      content.value = text;
   }

   return { editorInstance, content, json, formatJson, setContent, setEditorInstance };
});
