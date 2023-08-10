<template>
  <div class="flex items-center my-16">
    <div class="w-1/5">バナー表示：</div>
    <div class="w-4/5">
      <select
        name=""
        id="displayValue"
        class="border border-black w-80"
        v-model="choseAdvent"
      >
        <option v-for="item in advent" :value="item.id">
          {{ item.adventName }}
        </option>
      </select>
      <span class="btn ml-4" @click="registerAdvent">保存</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const showAdvent = ref(1);

//選択の初期値は、現在表示されている値
const choseAdvent = ref(1);

//アドベントカレンダーの表示
const registerAdvent = async () => {
  await axios.post("/api/advent/chooseAdvent", {
    currentAdventValue: showAdvent.value,
    newAdventValue: choseAdvent.value,
  });
  location.reload();
};
</script>

<style></style>
