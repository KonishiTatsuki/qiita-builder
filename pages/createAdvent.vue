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
      <input type="file" accept="image/*" ref="fileInput" />
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>
    <div class="flex justify-end">
      <button type="submit" class="btn" @click="submitHandler">登録</button>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, onMounted, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const router = useRouter();
const supabase = useSupabaseClient();

const { data } = await useFetch("/api/advent/post");

const errorMsg = ref("");
const user = useSupabaseUser();
const adventName = ref("");
const description = ref("");

const fileInput = ref();

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
  if (!adventName.value) {
    errorMsg.value = "アドベントカレンダーの題名を入力してください";
  } else if (!description.value) {
    errorMsg.value = "アドベントカレンダーの説明を入力してください";
  } else if (!fileInput.value) {
    errorMsg.value = "画像を選択してください";
  } else {
    let startDate = dayjs(date.value[0]).format("YYYY-MM-DD");
    let endDate = dayjs(date.value[1]).format("YYYY-MM-DD");

    const file = fileInput.value.files[0];
    const filePath = fileInput.value.files[0].name;

    // バナー画像の保存;
    const { error: avatarerror } = await supabase.storage
      .from("bannarImage")
      .upload(filePath, file);

    //バナー画像のpathを取得
    if (!avatarerror) {
      const { data } = await supabase.storage
        .from("bannarImage")
        .createSignedUrl(filePath, 600);
      const imageUrl = data.signedUrl;

      try {
        const user = useSupabaseUser();
        const create = {
          adventName: adventName.value,
          description: description.value,
          startDate: startDate,
          endDate: endDate,
          userId: user.value.id,
          image: imageUrl,
        };

        let { error } = await supabase.from("banner").upsert(create);
        if (error) throw error;
        router.push("/ownerPage");
      } catch (error) {
        // alert(error.message);
        errorMsg.value = "登録失敗";
      }
    } else {
      errorMsg.value = "既に保存されている画像です";
    }
  }
}
</script>

<style lang="scss" scoped></style>
