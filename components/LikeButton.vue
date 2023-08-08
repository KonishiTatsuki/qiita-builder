<template>
  <button
    @click="countLike(e)"
    v-if="!showLikeButton"
    class="bg-white border-indigo-700 px-4 py-2 rounded-md text-base border hover:text-gray-900"
  >
    いいね！
  </button>
  <button
    @click="countLike(e)"
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
  nowLike: Number;
  goalLike: Number;
};

const supabase = useSupabaseClient<Supabase>();
const router = useRouter();
const props = defineProps({
  userId: String,
  articleId: Number,
  showLikeButton: Boolean,
  nowLike: Number,
  goalLike: Number,
});
const showLikeButton = ref(props.showLikeButton);
const userId = props.userId;
const articleId = props.articleId;

const emit = defineEmits(["eventEmit"]);
//いいね数をカウントする関数
const countLike = async (e) => {
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
        emit("eventEmit", {
          nowLike: props.nowLike + 1,
          goalLike: props.goalLike - 1,
        });
        showLikeButton.value = true;
      } else {
        //いいね数を削除する
        await supabase
          .from("like")
          .delete()
          .eq("userId", userId)
          .eq("articleId", articleId);
        emit("eventEmit", {
          nowLike: props.nowLike - 1,
          goalLike: props.goalLike + 1,
        });
        showLikeButton.value = false;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
</script>
