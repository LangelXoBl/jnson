<script setup lang="ts">
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CSSWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HTMLWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { SplitterPanel, SplitterGroup, SplitterResizeHandle } from 'radix-vue';
import Editor from '@/components/app/editor/Editor.vue';
import { LANGUAGES, type PAYLOAD } from '@/components/app/editor/types';
import { ref } from 'vue';
import {
   SelectTrigger,
   Select,
   SelectContent,
   SelectGroup,
   SelectValue,
   SelectItem,
   SelectLabel,
} from './ui/select';

const selectedLanguage = ref();
let htmlCode = ref('');
let cssCode = ref('');
let jsCode = ref('');

function onChange(payload: PAYLOAD) {
   if (payload.type === LANGUAGES.HTML) {
      htmlCode.value = payload.code;
   } else if (payload.type === LANGUAGES.CSS) {
      cssCode.value = payload.code;
   } else if (payload.type === LANGUAGES.JS) {
      jsCode.value = payload.code;
   }
}

self.MonacoEnvironment = {
   getWorker(_: string, label: string) {
      if (label === 'json') return new JSONWorker();

      if (label === 'css' || label === 'scss' || label === 'less') return new CSSWorker();

      if (label === 'html' || label === 'handlebars' || label === 'razor')
         return new HTMLWorker();

      if (label === 'typescript' || label === 'javascript') return new TSWorker();

      return new EditorWorker();
   },
};
</script>

<template>
   <SplitterGroup id="splitter-group-1" direction="vertical" class="w-full h-full">
      <SplitterPanel
         id="splitter-group-1-panel-1"
         :min-size="20"
         class="border-b border-gray-700"
      >
         <SplitterGroup id="splitter-group-2" direction="horizontal">
            <SplitterPanel :min-size="5">
               <Editor
                  class="w-full h-full"
                  :type="LANGUAGES.HTML"
                  :display-name="LANGUAGES.HTML"
                  @code-change="onChange"
               />
            </SplitterPanel>
            <SplitterResizeHandle id="splitter-group-2-resize-handle-1" class="w-1" />
            <SplitterPanel :min-size="5">
               <Editor
                  class="w-full h-full"
                  :type="LANGUAGES.CSS"
                  :display-name="LANGUAGES.CSS"
                  @code-change="onChange"
               />
            </SplitterPanel>
            <SplitterResizeHandle id="splitter-group-2-resize-handle-2" class="w-1" />
            <SplitterPanel :min-size="5">
               <Editor
                  class="w-full h-full"
                  :type="LANGUAGES.JS"
                  :display-name="LANGUAGES.shortJs"
                  @code-change="onChange"
               />
            </SplitterPanel>
         </SplitterGroup>
      </SplitterPanel>
      <SplitterResizeHandle id="splitter-group-1-resize-handle-1" class="h-1" />
      <SplitterPanel id="splitter-group-1-panel-2" :min-size="5">
         <Select v-model="selectedLanguage">
            <SelectTrigger>
               <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup label="Languages">
                  <SelectItem value="html">
                     <SelectLabel>HTML</SelectLabel>
                  </SelectItem>
                  <SelectItem value="css">
                     <SelectLabel>CSS</SelectLabel>
                  </SelectItem>
                  <SelectItem value="js">
                     <SelectLabel>JavaScript</SelectLabel>
                  </SelectItem>
                  <SelectItem value="json">
                     <SelectLabel>json</SelectLabel>
                  </SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
         <Editor
            class="w-full h-full"
            :type="selectedLanguage"
            :display-name="selectedLanguage"
            @code-change="onChange"
         />
      </SplitterPanel>
   </SplitterGroup>
</template>
