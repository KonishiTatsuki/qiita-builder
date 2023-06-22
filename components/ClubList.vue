<template>
  <!-- サークル -->
  <div class="pt-12 mr-5">
    <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">サークル</h3>
    <ul
      class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <li
        v-for="(club, index) in clubName"
        :key="index"
        v-show="index < visibleClubItems"
        class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
      >
        <div class="flex items-center pl-3">
          <input
            :id="'club-checkbox-' + index"
            type="checkbox"
            value="club"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
            v-model="club.checked"
            @change="handleCheckboxChange(clubName, club)"
          />
          <label
            :for="'club-checkbox-' + index"
            class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
            >{{ club.clubName }}</label
          >
        </div>
      </li>
    </ul>
    <div v-if="clubName.length > 10" class="text-right">
      <button
        class="text-blue-600 text-sm font-medium"
        @click="toggleShowAllClubItems"
      >
        {{ showAllClubItems ? "閉じる" : "もっと見る" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  clubName: Array,
  visibleClubItems: Number,
  showAllClubItems: Boolean,
});
const emit = defineEmits(["clubcheckbox-change"]);
const visibleClubItems = ref(props.visibleClubItems);
const showAllClubItems = ref(props.showAllClubItems);

// プログラミング言語の表示数を変更する
const toggleShowAllClubItems = () => {
  if (showAllClubItems.value) {
    visibleClubItems.value = 10;
    showAllClubItems.value = false;
  } else {
    visibleClubItems.value = props.clubName?.length;
    showAllClubItems.value = true;
  }
};

// チェックボックスが変更されたときに親コンポーネントにイベントを発火させる
const handleCheckboxChange = (clubName, club) => {
  emit("clubcheckbox-change", clubName, club); // 親コンポーネントにイベントを発火させる
};
</script>
