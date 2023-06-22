<template>
  <div>
    <h1 class="title">アドベントカレンダー編集</h1>
    <h2 class="subtitle">題名</h2>
    <input
      maxlength="255"
      type="text"
      name="title"
      class="border border-blue-500 w-96"
      v-model="adventName"
    />
    <p class="text-red-500">
      {{ errorTitle }}
    </p>
    <h2 class="subtitle">アドベントカレンダーの説明</h2>
    <textarea
      name="body"
      cols="100"
      rows="7"
      maxlength="255"
      class="border border-blue-500"
      v-model="description"
    ></textarea>
    <p class="text-red-500">
      {{ errorContent }}
    </p>
    <h2 class="subtitle">期間</h2>
    <VueDatePicker v-model="date" locale="ja" :format="format" range />
    <p class="text-red-500">
      {{ errorDate }}
    </p>
    <h2 class="subtitle">バナー画像</h2>
    <div>
      <div>
        <img :src="bannerImage" alt="アイコン" width="200" height="150" />
      </div>
    </div>
    <div>
      <input type="file" accept="image/*" ref="fileInput" @change="setImage" />
    </div>
    <p class="text-red-500">{{ errorMsg }}</p>
    <div class="flex justify-end">
      <button class="btn" @click="editSubmit">編集完了</button>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";
const router = useRouter();
const route = useRoute();
const fileInput = ref();
const client = useSupabaseClient();
const user = useSupabaseUser();
let errorTitle = ref("");
let errorContent = ref("");
let errorDate = ref("");
const errorMsg = ref("");
const format = "yyyy/MM/dd";

const { data: advent } = await client
  .from("banner")
  .select("*")
  .eq("id", route.params.id);

const bannerImage = ref(`${advent[0].image}`);

const adventName = ref(`${advent[0].adventName}`);
const description = ref(`${advent[0].description}`);
const date = ref([`${advent[0].startDate}`, `${advent[0].endDate}`]);

const setImage = () => {
  const fileImg = fileInput.value.files[0];
  bannerImage.value = URL.createObjectURL(fileImg);
};

let create = {};

const editSubmit = async () => {
  errorTitle.value = "";
  errorContent.value = "";
  errorDate.value = "";
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
  if (!date.value) {
    errorDate.value = "期間の開始日と最終日を選択してください";
    return;
  } else if (date.value[1] === null) {
    errorDate.value = "期間の開始日と最終日を選択してください";
    return;
  } else {
    let startDate = dayjs(date.value[0]).format("YYYY-MM-DD");
    let endDate = dayjs(date.value[1]).format("YYYY-MM-DD");
    //バナー画像が編集された時
    if (fileInput.value.files[0]) {
      const file = fileInput.value.files[0];
      //ファイル名作成
      const random = Math.random().toString(32).substring(2);
      const filePath = random;
      await client.storage.from("bannarImage").upload(filePath, file);

      //バナー画像のpathを取得
      const { data } = await client.storage
        .from("bannarImage")
        .createSignedUrl(filePath, 2592000);
      const imageUrl = data.signedUrl;
      create = {
        id: route.params.id,
        adventName: adventName.value,
        description: description.value,
        startDate: startDate,
        endDate: endDate,
        userId: user.value.id,
        image: imageUrl,
      };
      let { error } = await client.from("banner").upsert(create);
      if (error) throw error;
      router.push("/ownerPage");
      //バナー画像が編集されてない時
    } else {
      create = {
        id: route.params.id,
        adventName: adventName.value,
        description: description.value,
        startDate: startDate,
        endDate: endDate,
        userId: user.value.id,
      };
      let { error } = await client.from("banner").upsert(create);
      if (error) throw error;
      router.push("/ownerPage");
    }
  }
};
</script>

<style lang="scss" scoped></style>
