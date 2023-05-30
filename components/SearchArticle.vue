<template>
  <input
    type="text"
    class="bg-white text-gray-900 rounded-full py-2 px-4 focus:outline-none focus:shadow-outline m-4"
    placeholder="検索"
    v-model="searchText"
    @input="onInput"
  />
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const searchText = ref("");
const router = useRouter();

const onInput = () => {
  // searchTextの値をクエリパラメータとしてURLに追加
  router.push({ query: { search: searchText.value } });
};
</script>
