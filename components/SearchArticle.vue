<template>
  <input
    type="text"
    class="bg-white text-gray-900 rounded-full py-2 pl-6 focus:outline-none focus:shadow-outline m-4"
    :style="inputStyle"
    placeholder="記事タイトルまたは記事内容で検索"
    v-model="searchText"
    @input="onInput"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const searchText = ref("");
const inputStyle = ref("width: 600px");
const router = useRouter();

const onInput = () => {
  // searchTextの値をクエリパラメータとしてURLに追加
  router.push({ query: { search: searchText.value } });
};

const updateInputStyle = () => {
  if (window.innerWidth < 1536) {
    inputStyle.value = "width: 300px";
  } else {
    inputStyle.value = "width: 600px";
  }
};

onMounted(() => {
  updateInputStyle();
  window.addEventListener("resize", updateInputStyle);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateInputStyle);
});
</script>
