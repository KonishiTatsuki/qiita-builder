<template>
  <button
    @click="countRecommend"
    v-if="showRecommendButton"
    class="bg-white border-indigo-700 px-4 py-2 rounded-md text-base border hover:text-gray-900"
  >
    おすすめ
  </button>
  <button
    @click="countRecommend"
    v-else
    class="bg-[#1D8EB9] px-4 py-2 rounded-md text-base text-white border hover:text-gray-900"
  >
    おすすめ
  </button>
</template>

<script setup>
const supabase = useSupabaseClient();
const router = useRouter();
const props = defineProps({
  userId: String,
  articleId: Number,
  showRecommendButton: Boolean,
});
const userId = props.userId;
const articleId = props.articleId;
const showRecommendButton = props.showRecommendButton;

//おすすめ数をカウントする関数
const countRecommend = async () => {
  try {
    //すでにおすすめを押しているのか確認
    const confirmation = await supabase
      .from("recommend")
      .select("*")
      .eq("userId", userId);
    if (!confirmation.data[0]) {
      // recommendテーブルにデータを挿入
      await supabase.from("recommend").insert({ userId, articleId });
      router.go();
    } else {
      //おすすめ数を削除する
      await supabase
        .from("recommend")
        .delete()
        .eq("userId", userId)
        .eq("articleId", articleId);
      router.go();
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
