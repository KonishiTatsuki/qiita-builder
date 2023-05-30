<template>
  <div>
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
const errorMsg = ref("");
//バナーデータ取得
// const { data: advent } = useFetch("/api/advent/get", {
//   method: "POST",
//   body: route.params.id,
// });

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
  let startDate = dayjs(date.value[0]).format("YYYY-MM-DD");
  let endDate = dayjs(date.value[1]).format("YYYY-MM-DD");

  //バナー画像が編集された時
  if (fileInput.value.files[0]) {
    const file = fileInput.value.files[0];
    const filePath = fileInput.value.files[0].name;
    const { error: avatarerror } = await client.storage
      .from("bannarImage")
      .upload(filePath, file);
    //バナー画像のpathを取得
    if (!avatarerror) {
      const { data } = await client.storage
        .from("bannarImage")
        .createSignedUrl(filePath, 600);
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
    } else {
      errorMsg.value = "既に保存されている画像です";
    }
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
};
</script>

<style lang="scss" scoped></style>
