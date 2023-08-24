<template>
  <div class="main">
    <div class="mb-10">
      <h1 class="title">アドベントカレンダー新規作成</h1>
      <div class="flex">
        <h2 class="text-2xl">題名</h2>
        <span class="text-xs text-red-500">(必須)</span>
      </div>
      <div>
        <input
          v-model="adventName"
          maxlength="255"
          type="text"
          name="title"
          class="border border-blue-500 w-96"
        />
        <div id="charCount" class="mt-4 mr-2">{{ adventName.length }}/255</div>
      </div>
    </div>
    <div class="mb-10">
      <div class="flex">
        <h2 class="text-2xl">説明</h2>
        <span class="text-xs text-red-500">(必須)</span>
      </div>
      <div>
        <textarea
          v-model="description"
          name="body"
          cols="100"
          rows="7"
          maxlength="255"
          class="border border-blue-500"
        ></textarea>
        <div id="charCount" class="mt-4 mr-2">{{ description.length }}/255</div>
      </div>
    </div>

    <div class="mb-10">
      <div class="flex">
        <h2 class="text-2xl">期間</h2>
        <span class="text-xs text-red-500">(必須)</span>
      </div>
      <VueDatePicker v-model="date" locale="ja" :format="format" range />
      <p class="text-red-500">{{ errorDate }}</p>
    </div>

    <div class="mb-10">
      <div class="flex">
        <h2 class="text-2xl">バナー画像</h2>
        <span class="text-xs text-red-500">(必須)</span>
      </div>
      <input type="file" accept="image/*" ref="fileInput" />
      <p class="text-red-500">{{ errorImage }}</p>
    </div>
    {{ errorMsg }}
    <div class="flex justify-end mt-10">
      <button type="submit" class="btn" @click="submitHandler">登録</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const router = useRouter();
const supabase = useSupabaseClient();
const errorTitle = ref("");
const errorContent = ref("");
const errorDate = ref("");
const errorImage = ref("");
const errorMsg = ref("");
const adventName = ref("");
const description = ref("");
const date = ref([]);
const fileInput = ref();
const format = "yyyy/MM/dd";

// supabaseにデータを送信する

async function submitHandler() {
  // バリデーションエラーメッセージの初期化
  errorTitle.value = "";
  errorContent.value = "";
  errorDate.value = "";
  errorImage.value = "";
  errorMsg.value = "";

  if (!adventName.value) {
    errorTitle.value = "題名を入力してください";
  } else if (adventName.value.length > 255) {
    errorTitle.value = "題名を255字以内で入力してください";
  }

  if (!description.value) {
    errorContent.value = "説明を入力してください";
  } else if (description.value.length > 255) {
    errorContent.value = "説明を255字以内で入力してください";
  }

  if (!date.value || !date.value[0] || !date.value[1]) {
    errorDate.value = "適切な期間を入力してください";
  }

  if (!fileInput.value.files[0]) {
    errorImage.value = "画像を選択してください";
  }

  if (
    errorTitle.value ||
    errorContent.value ||
    errorDate.value ||
    errorImage.value
  ) {
    return;
  }

  //ファイル名作成
  const random = Math.random().toString(32).substring(2);
  const filePath = random;
  const file = fileInput.value.files[0];
  // バナー画像の保存;
  const { error: avatarerror } = await supabase.storage
    .from("bannarImage")
    .upload(filePath, file);
  if (avatarerror) {
    errorMsg.value = "バナー画像の保存に失敗しました";
    return;
  }
  //バナー画像のpathを取得
  const { data } = await supabase.storage
    .from("bannarImage")
    .createSignedUrl(filePath, 2592000);
  const imageUrl = data?.signedUrl;

  try {
    const startDate = dayjs(date.value[0]).format("YYYY-MM-DD");
    const endDate = dayjs(date.value[1]).format("YYYY-MM-DD");
    const user = useSupabaseUser();
    const create = {
      adventName: adventName.value,
      description: description.value,
      startDate,
      endDate,
      userId: user.value?.id,
      image: imageUrl,
    };

    let { error } = await supabase.from("banner").upsert(create);
    if (error) throw error;
    router.push("/ownerPage");
  } catch (error) {
    errorMsg.value = "登録失敗";
  }
}
</script>
