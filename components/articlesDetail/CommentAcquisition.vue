<template>
  <div
    class="bg-gray-200 p-2 rounded my-3 flex justify-between items-center"
    v-for="commented in commentDate"
    :key="commented.id"
  >
    <div class="mr-5 w-full">
      <div class="flex justify-between">
        <div class="font-semibold">{{ commented.username }}</div>
        <button
          class="btn"
          @click="(open = true), (deleteItem = commented.id)"
          v-show="commented.userId == userId"
        >
          削除
        </button>
        <Teleport to="body">
          <div v-if="open" class="modal">
            <div class="modal-content">
              <p class="mb-5">本当に削除しますか？</p>
              <button @click="open = false" class="btn mr-5">No</button>
              <button @click="deleteComment(deleteItem)" class="btn">
                Yes
              </button>
            </div>
          </div>
        </Teleport>
      </div>
      <p class="text-gray-600">{{ commented.comment }}</p>
    </div>
  </div>
  <button
    v-show="showMoreComment"
    @click="showMoreCommentClick"
    class="mt-4 underline decoration-sky-500"
  >
    もっと見る
  </button>
  <button
    v-show="showCloseComment"
    @click="showCommentClick"
    class="mt-4 underline decoration-sky-500"
  >
    閉じる
  </button>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

let articleId = 188;
const commentDateOrigin = ref();
const commentDate = ref();
const showMoreComment = ref(false);
const showCloseComment = ref(false);
const users = ref({
  id: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
  email: "tatsuki.konishi@rakus-partners.co.jp",
});
let userId = "";
if (users.value) {
  userId = users.value.id;
}
const open = ref(false);

const commentAcquisition = async function () {
  //   const { data: commentDates } = await useFetch("/api/comment/get", {
  //     method: "POST",
  //     body: articleId,
  //   });
  const commentDatesAxios = await axios.post(
    "http://localhost:3000/api/comment/get",
    articleId,
    {
      headers: {
        "Content-Type": "application/json", // Content-Typeを適切なJSON形式に変更
      },
    }
  );
  //   if (commentDates.value) {
  if (commentDatesAxios.data) {
    // const { data: commentItem } = await useFetch("/api/user/commentUserGet", {
    //   method: "POST",
    //   body: commentDates.value,
    // });
    const commentItemAxios = await axios.post(
      "http://localhost:3000/api/user/commentUserGet",
      commentDatesAxios.data,
      {
        headers: {
          "Content-Type": "application/json", // Content-Typeを適切なJSON形式に変更
        },
      }
    );
    // commentDateOrigin.value = commentItem.value;
    commentDateOrigin.value = commentItemAxios.data;

    //表示するコメント数を制限
    // if (commentItem.value.length > 5) {
    if (commentItemAxios.data.length > 5) {
      //   commentDate.value = commentItem.value.slice(0, 5);
      commentDate.value = commentItemAxios.data.slice(0, 5);
      showMoreComment.value = true;
      showCloseComment.value = false;
    } else {
      //   commentDate.value = commentItem.value;
      commentDate.value = commentItemAxios.data;
      showMoreComment.value = false;
      showCloseComment.value = false;
    }
  } else {
    console.log("投稿済みコメントなし");
  }
};
commentAcquisition();

//コメントをもっと見る
const showMoreCommentClick = () => {
  showMoreComment.value = false;
  showCloseComment.value = true;
  commentDate.value = commentDateOrigin.value;
};
//コメントを閉じる
const showCommentClick = () => {
  showMoreComment.value = true;
  showCloseComment.value = false;
  commentDate.value = commentDateOrigin.value.slice(0, 5);
};
//コメントを削除
const deleteComment = async (commentId) => {
  try {
    // 削除処理の実行
    // await useFetch("/api/comment/delete", {
    //   method: "POST",
    //   body: commentId,
    // });
    await axios.post("http://localhost:3000/api/comment/delete", commentId, {
      headers: {
        "Content-Type": "application/json", // Content-Typeを適切なJSON形式に変更
      },
    });
    open.value = false;
  } catch (error) {
    console.error("コメントを削除でエラー");
  }
};
</script>
