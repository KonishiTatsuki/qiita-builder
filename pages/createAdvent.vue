<template>
  <div>
    <h1 class="title">アドベントカレンダー新規作成</h1>
    <h2 class="subtitle">アドベントカレンダーの題名</h2>
    <span class="text-xs text-red-500">(必須)</span>
    <input
      v-model="adventName"
      maxlength="30"
      type="text"
      name="title"
      class="border border-blue-500 w-96"
    />
    <h2 class="subtitle">アドベントカレンダーの説明</h2>
    <span class="text-xs text-red-500">(必須)</span>
    <textarea
      v-model="description"
      name="body"
      cols="100"
      rows="7"
      maxlength="255"
      class="border border-blue-500"
    ></textarea>
    <h2 class="subtitle">期間</h2>
    <span class="text-xs text-red-500">(必須)</span>
    <VueDatePicker v-model="date" locale="ja" :format="format" range />
    <div>{{ date }}</div>

    <h2 class="subtitle">バナー画像</h2>
    <div>
      <span class="text-xs text-red-500">(必須)</span>
      <input type="file" accept="image/*" />
    </div>
    <div class="flex justify-end">
      <button type="submit" class="btn" @click="submitHandler">登録</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const supabase = useSupabaseClient();

const { data } = await useFetch("/api/advent/post");
const loading = ref(false);

const user = useSupabaseUser();
const adventName = ref("");
const description = ref("");
const startDate = ref();
const endDate = ref();
const image = ref(null);

const date = ref([]);
const format = "yyyy/MM/dd";

// For demo purposes assign range from the current date
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
});

// supabaseにデータを送信する
async function submitHandler() {
  try {
    loading.value = true;
    const user = useSupabaseUser();

    const create = {
      adventName: adventName.value,
      description: description.value,
      startDate: startDate.value,
      endDate: endDate.value,
      userId: user.value.id,
      image: image.value,
    };

    let { error } = await supabase.from("banner").upsert(create);
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
