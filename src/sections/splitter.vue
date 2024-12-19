<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/store/editor';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

const store = useEditorStore();
const { setContent } = store;
const { json } = storeToRefs(store);

const splitRange = ref<{ start?: number; end?: number }>({}); // rango de datos a cortar

const splitItemsCount = computed(() => {
   const { start, end } = splitRange.value;
   if (!start || !end) return null;
   if (start >= end) return null;
   return end - start;
});

function splitItems() {
   const { start, end } = splitRange.value;
   setContent(JSON.stringify(json.value.slice(start, end), null, 2));
}
</script>

<template>
   <div class="flex items-center justify-center content-center gap-2 m-2">
      <p class="flex-shrink-0 font-medium">Splite items</p>
      <Input placeholder="Start" v-model="splitRange.start" type="number" />
      <Input placeholder="End" v-model="splitRange.end" type="number" />
      <Button :disabled="!splitItemsCount" @click="splitItems"
         >Split {{ splitItemsCount }}</Button
      >
   </div>
</template>
