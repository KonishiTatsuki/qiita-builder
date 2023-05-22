<template>
  <div>
    <textarea
      ref="contentArea"
      v-model="content"
      rows="5"
      placeholder="markdown形式で説明を記述できます。"
      maxlength="300"
    />
  </div>
</template>

<script lang="ts" setup>
import type EasyMDE from "easymde";
import { ref, onMounted } from "vue"
let mde: InstanceType<typeof EasyMDE> | null = null;
const content = ref("");
const contentArea = ref();
 
onMounted(async () => {
  const EasyMDE = (await import("easymde")).default;
  mde = new EasyMDE({
    element: contentArea.value!.$el,
  });
  mde.codemirror.on("change", () => {
    if (mde) {
      content.value = mde.value();
    }
  });
});
</script>
