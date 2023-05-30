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
const { data: articles, error } = supabase
  .from("article")
  .select("*")
  .eq("userId", userId);

console.log("articlesの結果", articles);
</script>

<style lang="scss" scoped></style>
