<template>
  <div>
    <h1 class="title">アドベントカレンダーに投稿</h1>
    <p class="text-red-500">※投稿や編集、削除ができるのは期間までです。</p>
    <div>
      <p>選択した日付: {{ date }}日</p>
    </div>
    <h2 class="subtitle">投稿する記事の選択</h2>
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
      <option value="" class="text-red-100">選択してください</option>
      <option
        v-for="article in articles.sort((a, b) => a.id - b.id)"
        :key="article.id"
        :value="article.id"
      >
        {{ article.title }}
      </option>
    </select>
    <p v-if="!selectedArticleId" class="text-red-500">記事を選択してください</p>
  </div>
  <div class="flex justify-end">
    <div>
      <button
        class="btn m-3 block"
        @click="submitHandler"
        :disabled="!selectedArticleId"
      >
        投稿
      </button>
      <button class="btn m-3 block" @click="deleteHandler">削除</button>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "アドベントカレンダー記事投稿",
});
// 取得したuserIdを使って、articleテーブルからuserIdが一致するものを取得してタイ
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import dayjs from "dayjs";

// 引数を受け取る変数
const bannerId = ref(null);
const date = ref(null);
const selectedArticleId = ref(null);
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value?.id;
const title = ref("");
const route = useRoute();
const isArticleSelected = ref(false);

onMounted(() => {
  bannerId.value = route.params.bannerId;
  date.value = route.params.date;

  console.log("bannerIdの結果", bannerId.value);
  console.log("selectDateの結果", date.value);
});

// user.idをもとにarticleテーブルから記事を全部取得する
const { data: articles } = await supabase
  .from("article")
  .select("*")
  .eq("userId", userId);
console.log("articles", articles);

// 投稿ボタンを押した時の処理
const submitHandler = async () => {
  if (!selectedArticleId.value) {
    isArticleSelected.value = false;
    return;
  }
  // articleIdを取得する
  const { data: articleId } = await supabase
    .from("article")
    .select("id")
    .eq("userId", userId)
    .eq("id", selectedArticleId.value);
  console.log("articleId", articleId);

  // bannerIdとpublishDateをarticleテーブルにデータを更新する
  const { data, error } = await supabase
    .from("article")
    .update({
      bannerId: bannerId.value,
      publishDate: date.value,
    })
    .eq("id", articleId[0].id);
  console.log("data", data);
  console.log("error", error);
  // ページをリロードする
  router.back();
};
const deleteHandler = async () => {
  const { data: articleId } = await supabase
    .from("article")
    .select("id")
    .eq("userId", userId)
    .eq("id", selectedArticleId.value);

  const { data, error } = await supabase
    .from("article")
    .update({ bannerId: null })
    .eq("id", articleId[0].id);
  console.log("data", data);
  console.log("error", error);
};

console.log("selectedArticle", selectedArticleId.value);
</script>

<style lang="scss" scoped></style>
