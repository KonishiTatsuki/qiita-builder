<template>
  <!-- プログラミング言語 -->
  <div class="pt-12 mr-5">
    <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
      プログラミング言語
    </h3>
    <ul
      class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <li
        v-for="(tag, index) in tagName"
        :key="index"
        v-show="index < visibleTagItems"
        class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
      >
        <div class="flex items-center pl-3">
          <input
            :id="'tag-checkbox-' + index"
            type="checkbox"
            value="tag"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
            v-model="tag.checked"
            @change="handleCheckboxChange(tagName, tag)"
          />
          <label
            :for="'tag-checkbox-' + index"
            class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >{{ tag.name }}</label
          >
        </div>
      </li>
    </ul>
    <div v-if="tagName.length > 10" class="text-right">
      <button
        class="text-blue-600 text-sm font-medium"
        @click="toggleShowAllTagItems"
      >
        {{ showAllTagItems ? "閉じる" : "もっと見る" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  tagName: Array,
  visibleTagItems: Number,
  showAllTagItems: Boolean,
});
const emit = defineEmits(["languagecheckbox-change"]);
const visibleTagItems = ref(props.visibleTagItems);
const showAllTagItems = ref(props.showAllTagItems);

// プログラミング言語の表示数を変更する
const toggleShowAllTagItems = () => {
  if (showAllTagItems.value) {
    visibleTagItems.value = 10;
    showAllTagItems.value = false;
  } else {
    visibleTagItems.value = props.tagName?.length;
    showAllTagItems.value = true;
  }
};

// チェックボックスが変更されたときに親コンポーネントにイベントを発火させる
const handleCheckboxChange = (tagName, tag) => {
  emit("languagecheckbox-change", tagName, tag); // 親コンポーネントにイベントを発火させる
};
</script>
