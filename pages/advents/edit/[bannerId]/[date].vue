<template>
  <div>
    <h1 class="title">アドベントカレンダーに投稿する記事を変更</h1>
    <p class="text-red-500">※投稿や編集、削除ができるのは期間までです。</p>
    <div>
      <p>選択した日付: {{ date }}</p>
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
      <button class="btn m-3 block" @click="editHandler">編集</button>
      <button class="btn m-3 block" @click="deleteHandler">削除</button>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "アドベントカレンダー投稿記事編集",
});
// 取得したuserIdを使って、articleテーブルからuserIdが一致するものを取得してタイ
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// 引数を受け取る変数
const bannerId = ref(null);
const date = ref(null);

const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value?.id;
const title = ref("");
const route = useRoute();

bannerId.value = route.params.bannerId;
date.value = route.params.date;

console.log("bannerIdの結果", bannerId.value);
console.log("selectDateの結果", date.value);

// userIdをもとにarticleテーブルからbannerIDとpublishDateがrouter.paramsと一致するものを取得する
const { data: postedData } = await supabase
  .from("article")
  .select("*")
  .eq("userId", userId)
  .eq("bannerId", bannerId.value)
  .eq("publishDate", date.value);
console.log("postedData", postedData);
const selectedArticleId = ref(`${postedData[0].id}`);

// user.idをもとにarticleテーブルから記事を全部取得する
const { data: articles } = await supabase
  .from("article")
  .select("*")
  .eq("userId", userId);
console.log("articles", articles);

// editHandlerを押した時の処理
const editHandler = async () => {
  if (!selectedArticleId.value) {
    alert("記事を選択してください");
    return;
  }
  const { data, error } = await supabase
    .from("article")
    .update({ bannerId: null })
    .eq("id", postedData[0].id);
  if (error) {
    console.error("初期値の記事updateできてない:", error);
    return;
  }
  console.log("初期値の記事をupdateした:", data);

  const { data: updateResult, error: updateError } = await supabase
    .from("article")
    .update({ bannerId: bannerId.value, publishDate: date.value })
    .eq("userId", userId)
    .eq("id", selectedArticleId.value);

  if (updateError) {
    console.error("新しく選択した記事がupdateされてない:", updateError);
    return;
  }
  console.log("新しく選択した記事がupdateされた:", updateResult);
  router.go(-1);
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
  router.go(-1);
};

console.log("selectedArticle", selectedArticleId.value);
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 124px);
}
</style>
