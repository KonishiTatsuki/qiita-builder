<template>
  <div>
    <h1 class="title">アドベントカレンダーに投稿</h1>
    <p class="text-red-500">※投稿や編集、削除ができるのは期間までです。</p>
    <h2 class="subtitle">題名</h2>
    <input
      maxlength="30"
      type="text"
      v-model="title"
      class="border border-blue-500 w-96"
    />
    <div>
      <p>選択した日付: {{ selectedDate }}</p>
      <p>入力したタイトル: {{ title }}</p>
    </div>
    <h2 class="subtitle">記事の選択</h2>

    <div class="mb-2">
      <select name="" id="">
        <option value="">記事１</option>
      </select>
    </div>
    <div class="flex justify-end">
      <div>
        <button class="btn m-3 block" @click="submitHandler">投稿</button>
        <button class="btn m-3 block">編集</button>
        <button class="btn m-3 block">削除</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// user情報からidを取得
// 取得したuserIdを使って、articleテーブルからuserIdが一致するものを取得してタイトルを表示する
// 登録ボタンを押下した時の処理
// タイトルを選択したら、公開日としてボタンを押下した日付と登録したアドベントカレンダーのIDをパッチする

import { useRouter } from "vue-router";
const router = useRouter();
const selectedDate = ref(null);
const title = ref("");
const article = ref([]);
const user = useSupabaseUser();
const { data: post } = await useFetch("/api/advent/get");
console.log(post);
//登録する押下
const submitHandler = async (credentials) => {
  console.log(credentials);
};

console.log(user.value);
// 遷移前の日付を取得
if (router.currentRoute.value.query.date) {
  selectedDate.value = router.currentRoute.value.query.date;
}
</script>

<style lang="scss" scoped></style>
