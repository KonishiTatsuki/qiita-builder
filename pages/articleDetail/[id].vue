<template>
  <div class="flex flex-col md:flex-row">
    <div class="md:w-2/3 p-4">
      <!-- アイコン・ユーザ名・投稿日 -->
      <div class="flex items-center mb-4">
        <!-- アイコン -->
        <img
          v-if="articleUsers.image"
          :src="articleUsers.image"
          alt="User"
          class="w-8 h-8 rounded-full mr-2"
        />
        <!-- ユーザ名 -->
        <span v-if="articleUsers" class="text-gray-600 text-sm">{{
          articleUsers.username
        }}</span>
        <span class="text-gray-400 text-sm mx-2">&nbsp;&nbsp;&nbsp;</span>
        <!-- 投稿日 -->
        <span v-if="formattedDate" class="text-gray-600 text-sm"
          >投稿：{{ formattedDate }}</span
        >
      </div>
      <!-- 記事タイトル -->
      <h1 v-if="articleData" class="text-4xl font-bold mb-2">
        <span class="break-words">
          {{ articleData.title }}
        </span>
      </h1>
      <hr class="border-t-2 border-gray-200" />
      <!-- カテゴリタグ -->
      <div v-if="tagNames" class="flex space-x-2 m-4">
        <span
          v-for="(tagName, index) in tagNames"
          :key="index"
          class="bg-blue-100 text-blue-600 px-2 py-1 rounded"
          >{{ tagName }}</span
        >
      </div>

      <div class="text-gray-800 mb-4" id="parent-element">
        <!-- tailwindcssのスタイルを無効化するcustom-proseクラス -->
        <template v-if="htmlText">
          <span class="custom-prose" v-html="htmlText"></span>
        </template>
        <template v-else>
          <span></span>
        </template>
      </div>

      <div class="flex justify-end space-x-4">
        <LikeButton
          :userId="userId"
          :articleId="Number(articleId)"
          :showLikeButton="showLikeButton"
        />
        <RecommendButton
          :userId="userId"
          :articleId="Number(articleId)"
          :showRecommendButton="showRecommendButton"
        />
      </div>
    </div>

    <!-- いいね数・目標までのいいね数・Qiitaオススメした人数 -->
    <div class="md:w-1/3 m-4 p-4 bg-gray-100 max-h-96">
      <div class="mb-4">
        <p class="text-gray-600 text-lg flex justify-center">
          現在の「いいね！」
        </p>
        <p class="text-red-500 text-4xl font-bold flex justify-center m-4">
          {{ likeCount }}
          <span class="text-lg text-gray-600 align-text-bottom pt-3">件</span>
        </p>
      </div>
      <div class="my-8">
        <span class="text-gray-600 text-lg flex justify-center"
          >目標まで残り</span
        >
        <p
          v-if="articleData"
          class="text-red-500 text-4xl font-bold flex justify-center m-4"
        >
          {{ goalLike }}
          <span
            class="text-lg text-gray-600 align-text-bottom pt-3"
            v-show="goalLike > 0"
            >件</span
          >
        </p>
      </div>
      <div class="mb-4">
        <span class="text-gray-600 text-lg flex justify-center"
          >Qiitaオススメ</span
        >
        <p class="text-[#1D8EB9] text-4xl font-bold flex justify-center m-4">
          {{ recommendCount }}
          <span class="text-lg text-gray-600 align-text-bottom pt-3">人</span>
        </p>
      </div>
    </div>
  </div>

  <!-- コメントフォーム -->
  <div class="p-4 bg-gray-100">
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
    <div>
      <h2 class="text-xl font-bold mb-2">投稿済みのコメント</h2>
      <!-- 過去のコメントを表示するループ -->
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
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "記事詳細",
});

import LikeButton from "~/components/LikeButton.vue";
import RecommendButton from "~/components/RecommendButton.vue";
import { ref } from "vue";
import { marked } from "marked";

//モーダルの表示非表示
const open = ref(false);
const deleteItem = ref();
const route = useRoute();
const users = useSupabaseUser();
const router = useRouter();

//コメント文字数制限
const errorText = ref(false);

//ユーザーIdを取得
let userId = "";
if (users.value) {
  userId = users.value.id;
}
//ユーザー情報取得
let userInfo = ref();
const { data: userData } = await useFetch("/api/user/userGet", {
  method: "POST",
  body: userId,
});
userInfo.value = userData.value;
//現在の日付取得
let date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
//自動投稿用
const dateString = `${year}/${month}/${day}`;

//記事IDを取得
let articleId = route.params.id;
//投稿者の情報を取得
let articleUsers = ref();
// 記事情報を取得[始まり]
let articleData = ref();
let htmlText = ref();
let formattedDate = ref();
let articleTagIds = [];
let tagNames = ref();
const goalLike = ref(0);

const { data: articleDatas } = await useFetch("/api/article/articleDateGet", {
  method: "POST",
  body: articleId,
});
const { data: articleUser } = await useFetch("/api/user/userGet", {
  method: "POST",
  body: articleDatas.value[0].userId,
});
articleUsers.value = articleUser.value[0];
articleData.value = articleDatas.value[0];

//記事の公開日判定
//公開日のミリ秒取得
const display = ref(false);
let articleDate = articleData.value.publishDate;
articleDate = new Date(articleDate);
const articleDateMs = articleDate.getTime();
//現在のミリ秒取得
const dateMs = date.getTime();
//記事詳細画面表示条件
if (
  articleDateMs - dateMs > 0 &&
  articleUsers.value.id !== userInfo.value[0].id
) {
  router.push("/");
}

// mangleパラメータ・headerIdsパラメータを無効化するために{mangle: false, headerIds: false }}を設定
htmlText.value = marked.parse(articleDatas.value[0].body, {
  mangle: false,
  headerIds: false,
});
// 日時のフォーマットを設定
const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "UTC",
};
const dateObject = new Date(articleDatas.value[0].date);
// フォーマットを適用
formattedDate.value = dateObject.toLocaleString("ja-JP", options);
//タグ取得
const { data: tagIds } = await useFetch("/api/tagging/get", {
  method: "POST",
  body: articleId,
});
const { data: tags } = await useFetch("/api/tag/get", {
  method: "POST",
  body: tagIds.value,
});
tagNames.value = tags.value;

//　　　　　　　おすすめ数表示機能　　　　　　　　　　//
const recommendCount = ref(0);
const showRecommendButton = ref(false);
// おすすめ数取得;
const { data: recommends } = await useFetch("/api/recommend/articleGet", {
  method: "POST",
  body: articleId,
});
recommendCount.value = recommends.value.length;
//おすすめボタンクリック済みか確認
const { data: recommendUsers } = await useFetch("/api/recommend/get", {
  method: "POST",
  body: { articleId, userId },
});
if (recommendUsers.value[0]) {
  showRecommendButton.value = true;
}

//　　　　　　　いいね数表示機能　　　　　　　　　　//
// いいねの件数を表示するためのリアクティブな変数
const likeCount = ref(0);
const showLikeButton = ref(false);
//Qiita投稿に必要な情報取得
const articleQiitaToken = articleUsers.value.qiitaToken;
const articleBody = articleData.value.body;
const articleTitle = articleData.value.title;
const articleQiitaPost = articleData.value.qiitaPost;
const articleTag = Object.keys(tagNames.value).map((key) => {
  return { name: tagNames.value[key] };
});
// いいね数の取得
const { data: likes } = await useFetch("/api/like/likeNumberGet", {
  method: "POST",
  body: articleId,
});
// ユーザーがいいねしているかどうかの確認
const { data: likeschecks } = await useFetch("/api/like/likeCheckGet", {
  method: "POST",
  body: { userId, articleId },
});

if (likeschecks.value[0]) {
  showLikeButton.value = true;
}
likeCount.value = likes.value.length;

//目標いいねに到達してたら「達成」。それ以外は残り件数表示する
const articleDataGoalLike = Number(articleData.value.goalLike);
goalLike.value =
  articleDataGoalLike - likeCount.value > 0
    ? `${articleDataGoalLike - likeCount.value}`
    : "達成";

//いいね数が目標いいねに到達した場合
const goalLikeNumber = ref(0);
goalLikeNumber.value = articleDataGoalLike - likeCount.value;

if (goalLikeNumber.value <= 0 && articleQiitaPost === false) {
  ///自動投稿
  const fetchData = () => {
    const item = {
      body: articleBody, // マークダウン形式で記載が必要
      private: false, // 限定共有状態かどうかを表すフラグ (Qiita Teamでは無効)
      tags: articleTag,
      title: articleTitle,
      tweet: false, // Twitterに投稿するかどうか (Twitter連携を有効化している場合のみ有効)
    };

    fetch("https://qiita.com/api/v2/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${articleQiitaToken}`,
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        // 成功処理
        console.log("成功");
      })
      .catch(() => {
        // 失敗処理
        console.log("失敗");
      });
  };
  fetchData();
  await useFetch("/api/article/qiitaPostUpdate", {
    method: "POST",
    body: articleId,
  });
} else {
  console.log("まだ達成してないよ/もしくはQiitaに投稿済み");
}

//　　　　　　　　コメント機能　　　　　　　　　//
//投稿済みコメントを取得
const commentDate = ref();
const { data: commentDates } = await useFetch("/api/comment/get", {
  method: "POST",
  body: articleId,
});

if (commentDates.value) {
  const { data: commentItem } = await useFetch("/api/user/commentUserGet", {
    method: "POST",
    body: commentDates.value,
  });
  commentDate.value = commentItem.value;
} else {
  console.log("投稿済みコメントなし");
}

//コメント投稿機能
//コメント
let comment = ref("");
let commentError = ref("");

// textareaValue.value.length >= 8;
//コメント送信
const submit = async () => {
  if (comment.value.length > 0) {
    const { data: articleUser } = await useFetch("/api/comment/insert", {
      method: "POST",
      body: {
        date: dateString,
        userId: userId,
        comment: comment.value,
        articleId: articleId,
      },
    });
    errorText.value = false;
    location.reload();
  } else {
    errorText.value = true;
  }
};

//コメントを削除
const deleteComment = async (commentId) => {
  try {
    // 削除処理の実行
    const { data: articleUser } = await useFetch("/api/comment/delete", {
      method: "POST",
      body: commentId,
    });
    open.value = false;
    location.reload();
    // 削除後にコメントを再取得するなどの更新処理を実行する場合はここで行う
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
.custom-prose * {
  all: revert;
}

/* モーダルCSS */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* background-color: #959393; */
  background-color: rgba(149, 147, 147, 0.3);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 40px;
  border: 1px solid #888;
  width: 300px;
  text-align: center;
}
#parent-element {
  word-wrap: break-word;
}
</style>
