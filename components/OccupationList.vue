<template>
  <!-- 職種 -->
  <div class="pt-12 mr-5">
    <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">職種</h3>
    <ul
      class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <li
        v-for="(occupation, index) in occupationName"
        :key="index"
        class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
      >
        <div class="flex items-center pl-3">
          <input
            :id="'occupation-checkbox-' + index"
            type="checkbox"
            :value="occupation"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
            v-model="occupation.checked"
            @change="handleCheckboxChange(occupationName, occupation)"
          />
          <label
            :for="'occupation-checkbox-' + index"
            class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >{{ occupation.occupationName }}</label
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  occupationName: Array,
});
const emit = defineEmits(["occupationcheckbox-change"]);

// チェックボックスが変更されたときに親コンポーネントにイベントを発火させる
const handleCheckboxChange = (occupationName, occupation) => {
  emit("occupationcheckbox-change", occupationName, occupation); // 親コンポーネントにイベントを発火させる
};
</script>
