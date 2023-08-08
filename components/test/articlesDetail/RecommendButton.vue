<template>
  <button
    @click="countRecommend(e)"
    v-if="!showRecommendButton"
    class="bg-white border-indigo-700 px-4 py-2 rounded-md text-base border hover:text-gray-900"
  >
    おすすめ
  </button>
  <button
    @click="countRecommend(e)"
    v-else
    class="bg-[#1D8EB9] px-4 py-2 rounded-md text-base text-white border hover:text-gray-900"
  >
    おすすめ
  </button>
</template>

<script setup lang="ts">
import { createClient } from "@supabase/supabase-js";
import { ref } from "vue";
import axios from "axios";

// type Supabase = {
//   userId: String;
//   articleId: Number;
//   showLikeButton: Boolean;
//   nowRecommend: Number;
// };

// const supabase = useSupabaseClient<Supabase>();
const props = defineProps({
  userId: String,
  articleId: Number,
  showRecommendButton: Boolean,
  nowRecommend: Number,
});
const showRecommendButton = ref(props.showRecommendButton);
const userId = props.userId;
const articleId = props.articleId;
const confirmationAxios = ref()

const emit = defineEmits(["eventEmit"]);

//おすすめ数をカウントする関数
const countRecommend = async () => {
  try {
    //すでにおすすめを押しているのか確認
    // const confirmation = await supabase
    //   .from("recommend")
    //   .select("*")
    //   .eq("userId", userId)
    //   .eq("articleId", articleId);
    confirmationAxios.value = await axios.post(
      "http://localhost:3000/api/recommend/recommendConfirmation",
      // "/api/like/likeConfirmation",
      { userId: userId, articleId: articleId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // if (!confirmation.data[0]) {
    if (!confirmationAxios.value.data[0]) {
      // recommendテーブルにデータを挿入
      // await supabase.from("recommend").insert({ userId, articleId });
      await axios.post(
        "http://localhost:3000/api/recommend/insert",
        // "/api/like/insert",
        { userId: userId, articleId: articleId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      emit("eventEmit", { nowRecommend: props.nowRecommend + 1 });
      showRecommendButton.value = true;
    } else {
      // //おすすめ数を削除する
      // await supabase
      //   .from("recommend")
      //   .delete()
      //   .eq("userId", userId)
      //   .eq("articleId", articleId);
      await axios.post(
        "http://localhost:3000//api/recommend/delete",
        // "/api/like/delete",
        { userId: userId, articleId: articleId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      emit("eventEmit", { nowRecommend: props.nowRecommend - 1 });
      showRecommendButton.value = false;
    }
    //recommendテーブルから該当する記事のおすすめ数を取得
    // const { data, error } = await supabase
    //   .from("recommend")
    //   .select("*")
    //   .eq("articleId", articleId);
    const { data } = await axios.post(
      "http://localhost:3000//api/recommend/articleIdGet",
      // "/api/like/delete",
      { articleId: articleId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
</script>
