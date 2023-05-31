<template>
  <div>
    <h1 class="title">アドベントカレンダーに投稿</h1>
    <p class="text-red-500">※投稿や編集、削除ができるのは期間までです。</p>
    <div>
      <p>選択した日付: {{ date }}日</p>
      <!-- <p>入力したタイトル: {{ title }}</p> -->
    </div>
    <h2 class="subtitle">投稿する記事の選択</h2>
    <!-- articleの記事タイトルをプルダウンで表示する -->
    <label
      for="countries"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >記事を選択してください</label
    >
    <select
      id="countries"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      v-model="selectedArticleId"
    >
      <option
        v-for="article in articles.sort((a, b) => a.id - b.id)"
        :key="article.id"
        :value="article.id"
      >
        {{ article.title }}
      </option>
    </select>
  </div>
  <div class="flex justify-end">
    <div>
      <button class="btn m-3 block" @click="submitHandler">投稿</button>
      <button class="btn m-3 block">編集</button>
      <button class="btn m-3 block">削除</button>
    </div>
  </div>
</template>

<script setup>
// 取得したuserIdを使って、articleテーブルからuserIdが一致するものを取得してタイ
import { ref } from "vue";

// 引数を受け取る変数
const bannerId = ref(null);
const date = ref(null);
const selectedArticleId = ref(null);
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

// 投稿ボタンを押した時の処理

console.log("selectedArticle", selectedArticleId.value);
</script>

<style lang="scss" scoped></style>
