<template>
  <div>おすすめボタンテスト</div>
  <RecommendButton
    :userId="userId"
    :articleId="Number(articleId)"
    :showRecommendButton="showRecommendButton"
    :nowRecommend="nowRecommend"
    @eventEmit="ChangeNowRecommend"
  />
</template>

<script setup>
// import RecommendButton from "~/components/RecommendButton.vue";
import RecommendButton from "../RecommendButton.vue";
import axios from "axios";
import { ref } from "vue";

const nowRecommend = ref(0);
const showRecommendButton = ref(false);
const users = ref({
  id: "d3ca0ed5-df19-4174-8e9f-9c0841fe90fe",
  email: "himuro@rakus-partners.co.jp",
});
let userId = "";
if (users.value) {
  userId = users.value.id;
}

// let articleId = route.params.id;
let articleId = 188;

const recommendsFn = async () => {
  const recommendsAxios = await axios.post(
    "http://localhost:3000/api/recommend/articleGet",
    { articleId: articleId }, // articleIdをオブジェクト形式で渡す
    {
      headers: {
        "Content-Type": "application/json", // Content-Typeを適切なJSON形式に変更
      },
    }
  );
  console.log("recommendsAxios", recommendsAxios.data.length);
  // //おすすめ数取得
  nowRecommend.value = recommendsAxios.data.length;
};
recommendsFn();

const ChangeNowRecommend = (val) => {
  nowRecommend.value = val.nowRecommend;
};
</script>
