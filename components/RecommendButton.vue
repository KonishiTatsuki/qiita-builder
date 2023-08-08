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
type Supabase = {
  userId: String;
  articleId: Number;
  showLikeButton: Boolean;
  nowRecommend: Number;
};

const supabase = useSupabaseClient<Supabase>();
const router = useRouter();
const props = defineProps({
  userId: String,
  articleId: Number,
  showRecommendButton: Boolean,
  nowRecommend: Number,
});
const showRecommendButton = ref(props.showRecommendButton);
const userId = props.userId;
const articleId = props.articleId;

const emit = defineEmits(["eventEmit"]);

//おすすめ数をカウントする関数
const countRecommend = async () => {
  try {
    //すでにおすすめを押しているのか確認
    const confirmation = await supabase
      .from("recommend")
      .select("*")
      .eq("userId", userId)
      .eq("articleId", articleId);
    if (!(confirmation.data === null)) {
      if (!confirmation.data[0]) {
        // recommendテーブルにデータを挿入
        console.log(userId, articleId);
        await supabase.from("recommend").insert({ userId, articleId });
        emit("eventEmit", { nowRecommend: props.nowRecommend + 1 });
        showRecommendButton.value = true;
      } else {
        // //おすすめ数を削除する
        await supabase
          .from("recommend")
          .delete()
          .eq("userId", userId)
          .eq("articleId", articleId);
        emit("eventEmit", { nowRecommend: props.nowRecommend - 1 });
        showRecommendButton.value = false;
      }
    }
    //recommendテーブルから該当する記事のおすすめ数を取得
    const { data, error } = await supabase
      .from("recommend")
      .select("*")
      .eq("articleId", articleId);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
</script>
