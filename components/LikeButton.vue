<template>
  <button
    @click="countLike"
    v-if="!showLikeButton"
    class="bg-white border-indigo-700 px-4 py-2 rounded-md text-base border hover:text-gray-900"
  >
    いいね！
  </button>
  <button
    @click="countLike"
    v-else
    class="bg-red-500 px-4 py-2 rounded-md text-base text-white border hover:text-gray-900"
  >
    いいね！
  </button>
</template>

<script setup lang="ts">
type Supabase = {
  userId: String;
  articleId: Number;
  showLikeButton: Boolean;
};

const supabase = useSupabaseClient<Supabase>();
const router = useRouter();
const props = defineProps({
  userId: String,
  articleId: Number,
  showLikeButton: Boolean,
});
const userId = props.userId;
const articleId = props.articleId;
const showLikeButton = props.showLikeButton;

console.log(showLikeButton)

//いいね数をカウントする関数
const countLike = async () => {
  try {
    //すでにいいねを押しているのか確認
    const confirmation = await supabase
      .from("like")
      .select("*")
      .eq("userId", userId)
      .eq("articleId", articleId);
    if (!(confirmation.data === null)) {
      if (!confirmation.data[0]) {
        // Likeテーブルにデータを挿入
        await supabase.from("like").insert({ userId, articleId });
        location.reload();
      } else {
        //いいね数を削除する
        await supabase
          .from("like")
          .delete()
          .eq("userId", userId)
          .eq("articleId", articleId);
        location.reload();
      }
    }
    //likeテーブルから該当する記事のいいね数を取得
    const { data, error } = await supabase
      .from("like")
      .select("*")
      .eq("articleId", articleId);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
</script>
