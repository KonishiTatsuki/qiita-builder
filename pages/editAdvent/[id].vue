<template>
  <div>
    {{ $route.params.id }}
    <h1 class="title">アドベントカレンダー編集</h1>
    <h2 class="subtitle">アドベントカレンダーの題名</h2>
    <input
      maxlength="30"
      type="text"
      name="title"
      class="border border-blue-500 w-96"
      v-model="adventName"
    />
    <h2 class="subtitle">アドベントカレンダーの説明</h2>
    <textarea
      name="body"
      cols="100"
      rows="7"
      maxlength="255"
      class="border border-blue-500"
      v-model="description"
    ></textarea>
    <h2 class="subtitle">期間</h2>
    <VueDatePicker v-model="date" locale="ja" :format="format" range />
    <h2 class="subtitle">バナー画像</h2>
    <div>
      <!-- <img
        :src="advent[0].image"
        alt="アイコン"
        class="w-48 h-48 rounded-full mr-2"
      /> -->
      {{ advent }}
    </div>
    <div>
      <input type="file" accept="image/*" />
    </div>
    <div class="flex justify-end">
      <button class="btn">編集完了</button>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const route = useRoute();

const client = useSupabaseClient();
//バナーデータ取得
// const { data: advent } = useFetch("/api/advent/get", {
//   method: "POST",
//   body: route.params.id,
// });

const { data: advent } = await client.from("banner").select("*").eq("id", 24);
const adventName = ref(`${advent[0].adventName}`);
const description = ref(`${advent[0].description}`);
const date = ref([`${advent[0].startDate}`, `${advent[0].endDate}`]);
</script>

<style lang="scss" scoped></style>
