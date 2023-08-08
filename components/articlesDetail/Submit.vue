<template>
  <div>コメント送信</div>
  <h2 class="text-xl font-bold mb-2">コメント</h2>
  <form class="flex flex-col items-end" @submit.prevent="submit">
    <textarea
      v-model="comment"
      name="comment"
      id="comment"
      rows="5"
      placeholder="コメントを入力してください"
      class="w-full border border-gray-200 p-2 rounded"
      maxlength="255"
      oninput="document.getElementById('charCount').textContent = this.value.length + '/255'"
    ></textarea>
    <p v-if="errorText" class="text-red-500">コメントを入力してください</p>
    <div class="flex mt-3">
      <div id="charCount" class="mt-4 mr-2">0/255</div>
      <button type="submit" class="btn">送信</button>
    </div>
  </form>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const users = ref({
  id: "d3ca0ed5-df19-4174-8e9f-9c0841fe90fe",
  email: "himuro@rakus-partners.co.jp",
});
let userId = "";
if (users.value) {
  userId = users.value.id;
}

let articleId = 188;

//現在の日付取得
let date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
//自動投稿用
const dateString = `${year}/${month}/${day}`;

const comment = ref("");
const errorText = ref(false);

const submit = async () => {
  try {
    if (comment.value.length > 0) {
      // const { data: articleUser } = await useFetch("/api/comment/insert", {
      //   method: "POST",
      //   body: {
      //     date: dateString,
      //     userId: userId,
      //     comment: comment.value,
      //     articleId: articleId,
      //   },
      // });
      await axios.post(
        "/api/comment/insert",
        {
          date: dateString,
          userId: userId,
          comment: comment.value,
          articleId: articleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      errorText.value = false;
      comment.value = "";
      // location.reload();
    } else {
      errorText.value = true;
    }
  } catch (error) {
    console.log("コメント送信でエラー");
  }
};
</script>
