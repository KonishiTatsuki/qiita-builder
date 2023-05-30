<template>
  <div class="flex flex-col md:flex-row">
    <div class="md:w-2/3 p-4">
      <!-- アイコン・ユーザ名・投稿日 -->
      <div class="flex items-center mb-4">
        <!-- アイコン -->
        <img
          v-if="userInfo[0].image"
          :src="userInfo[0].image"
          alt="User"
          class="w-8 h-8 rounded-full mr-2"
        />
        <!-- ユーザ名 -->
        <span v-if="userInfo" class="text-gray-600 text-sm">{{
          userInfo[0].username
        }}</span>
        <span class="text-gray-400 text-sm mx-2">&nbsp;&nbsp;&nbsp;</span>
        <!-- 投稿日 -->
        <span v-if="formattedDate" class="text-gray-600 text-sm"
          >投稿：{{ formattedDate }}</span
        >
      </div>
      <!-- 記事タイトル -->
      <h1 v-if="articleData" class="text-4xl font-bold mb-2">
        {{ articleData[0].title }}
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

      <div class="text-gray-800 mb-4">
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
          :articleId="articleId"
          :showLikeButton="showLikeButton"
        />
        <RecommendButton
          :userId="userId"
          :articleId="articleId"
          :showRecommendButton="showRecommendButton"
        />
      </div>
    </div>

    <!-- いいね数・目標までのいいね数・Qiitaオススメした人数 -->
    <div class="md:w-1/3 m-4 p-4 bg-gray-100">
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
      <div class="flex mt-3">
        <div id="charCount" class="mt-4 mr-2">0/255</div>
        <button type="submit" class="btn">送信</button>
      </div>
    </form>
    <!-- <div v-show="result"> -->
    <div>
      <h2 class="text-xl font-bold mb-2">投稿済みのコメント</h2>
      <!-- 過去のコメントを表示するループ -->
      <div
        class="bg-gray-200 p-2 rounded my-3 flex justify-between items-center"
        v-for="commented in commenteds"
        :key="commented.id"
      >
        <div>
          <span class="font-semibold">{{ commented.username }}</span>
          <p class="text-gray-600">{{ commented.comment }}</p>
        </div>
        <button class="text-gray-600" @click="deleteComment(commented.id)">
          削除
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import LikeButton from "~/components/LikeButton.vue";
import RecommendButton from "~/components/RecommendButton.vue";
import { ref, onMounted } from "vue";
import { marked } from "marked";

const route = useRoute();
const supabase = useSupabaseClient();
const users = useSupabaseUser();
const router = useRouter();

const userId = users.value?.id;
let userInfo = ref();
let articleId = route.params.id;

// 記事情報を取得[始まり]
let articleData = ref();
let htmlText = ref();
let formattedDate = ref();
let tagNames = ref([]);
const goalLike = ref(0);

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

(async () => {
  //記事ID取得
  let dynamicPageId = await route.params.id;

  let { data } = await supabase
    .from("article")
    .select("*")
    .eq("id", dynamicPageId);
  articleData.value = await data;
  htmlText.value = await marked.parse(articleData.value[0].body);
  const dateObject = await new Date(articleData.value[0].date);
  // フォーマットを適用
  formattedDate.value = await dateObject.toLocaleString("ja-JP", options);

  // taggingテーブルからarticleIdを基にtagIdの配列を取ってくる
  let { data: tagId } = await supabase
    .from("tagging")
    .select("tagId")
    .eq("articleId", dynamicPageId);

  // 各IDに対応するタグ名を取得
  tagId.forEach(async (tag) => {
    const { data, error } = await supabase
      .from("tag")
      .select("name")
      .eq("id", tag.tagId);

    if (error) {
      console.error(error);
      return;
    }

    if (data.length > 0) {
      tagNames.value.push(data[0].name);
    }
  });

  let userId = await articleData.value[0].userId;
  let { data: userData } = await supabase
    .from("profiles")
    .select("username,image")
    .eq("id", userId);
  userInfo.value = userData;
})();

//　　　　　　　おすすめ数表示機能　　　　　　　　　　//
const recommendCount = ref(0);
const showRecommendButton = ref(false);

//おすすめ数を取得する関数
const Recommend = async () => {
  let { data } = await supabase
    .from("recommend")
    .select("*")
    .eq("articleId", articleId);

  const confirmation = await supabase
    .from("recommend")
    .select("*")
    .eq("userId", userId);
  if (confirmation.data[0]) {
    showRecommendButton.value = true;
  }

  return data.length;
};
recommendCount.value = await Recommend();

//　　　　　　　いいね数表示機能　　　　　　　　　　//
// いいねの件数を表示するためのリアクティブな変数
const likeCount = ref(0);
const showLikeButton = ref(false);
//Qiita投稿に必要な情報取得
let { data: user } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId);

let { data: article } = await supabase
  .from("article")
  .select("*")
  .eq("id", articleId);

let { data: articleUserDate } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", article[0].userId);

const articleQiitaToken = articleUserDate[0].qiitaToken;
const qiitaToken = user[0].qiitaToken;
const articleBody = article[0].body;
const articleTitle = article[0].title;
const articleQiitaPost = article[0].qiitaPost;
const articleTag = Object.keys(tagNames.value).map((key) => {
  return { name: tagNames.value[key] };
});

//いいね数を取得する関数
const Like = async () => {
  let { data } = await supabase
    .from("like")
    .select("*")
    .eq("articleId", articleId);

  const confirmation = await supabase
    .from("like")
    .select("*")
    .eq("userId", userId);

  if (confirmation.data[0]) {
    showLikeButton.value = true;
  }
  return data.length;
};
likeCount.value = await Like();

//目標いいねに到達してたら「達成」。それ以外は残り件数表示する
const articleDataGoalLike = Number(articleData.value[0].goalLike);
goalLike.value =
  Number(articleData.value[0].goalLike) - likeCount.value > 0
    ? `${Number(articleData.value[0].goalLike) - likeCount.value}`
    : "達成";

//いいね数が目標いいねに到達した場合
if (goalLike.value <= 0 && articleQiitaPost === false) {
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
      .catch((error) => {
        // 失敗処理
        console.log("失敗");
      });
  };
  fetchData();
  await supabase
    .from("article")
    .update({ qiitaPost: true })
    .match({ id: articleId });
} else {
  console.log("まだ達成してないよ/もしくはQiitaに投稿済み");
}

//　　　　　　　　コメント機能　　　　　　　　　//
//投稿済みコメントを取得
const commentData = async () => {
  let { data, error } = await supabase
    .from("comment")
    .select("*")
    .eq("articleId", articleId);
  // dataのループ処理 map
  if (data) {
    await Promise.all(
      data.map(async (item) => {
        let { data: users } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", item.userId);
        item.username = users[0].username;
      })
    );
  } else {
    console.log("投稿済みコメントなし");
  }
  return data;
};
const commenteds = await commentData();

//コメント投稿機能
let date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
//投稿日
date = `${year}/${month}/${day}`;
//コメント
let comment = ref("");
comment = comment.value;

const submit = async () => {
  let { data, error } = await supabase
    .from("comment")
    .insert({ date, userId, comment, articleId });
  router.go();
};

//コメントを削除
const deleteComment = async (commentId) => {
  try {
    // 削除処理の実行
    await supabase.from("comment").delete().eq("id", commentId);
    router.go();
    // 削除後にコメントを再取得するなどの更新処理を実行する場合はここで行う
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
/* .custom-prose :is(h1, h2, h3, h4, h5, h6, ul, ol, li) {
  all: revert;
} */

.custom-prose * {
  all: revert;
}
</style>
