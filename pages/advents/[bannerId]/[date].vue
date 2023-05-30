<template>
  <div>
    <h1 class="title">アドベントカレンダーに投稿</h1>
    <p class="text-red-500">※投稿や編集、削除ができるのは期間までです。</p>
    <h2 class="subtitle">題名</h2>
    <div>{{}}</div>
    <div>
      <p>選択した日付: {{ date }}日</p>
      <p>入力したタイトル: {{ title }}</p>
    </div>
    <h2 class="subtitle">記事の選択</h2>
    <div v-for="article in articles" :key="article.id">
      <div>
        <label
          for="countries_multiple"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select an option</label
        >
        <select
          multiple
          id="countries_multiple"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose countries</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
    </div>
    <div class="mb-2">
      <select name="" id="" class="p-200">
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
// 取得したuserIdを使って、articleテーブルからuserIdが一致するものを取得してタイ
import { ref } from "vue";

// 引数を受け取る変数
const bannerId = ref(null);
const date = ref(null);

const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value?.id;
const title = ref("");

// ルート情報を取得してadventの引数を代入
const route = useRoute();
console.log("routeの結果", route);
bannerId.value = route.params.bannerId;
date.value = route.params.date;

console.log("bannerIdの結果", bannerId.value);
console.log("dateの結果", date.value);

// user.idをもとにarticleテーブルから記事を全部取得する
const { data: articles } = await supabase
  .from("article")
  .select("*")
  .eq("userId", userId);

console.log("articles", articles);
</script>

<style lang="scss" scoped></style>
