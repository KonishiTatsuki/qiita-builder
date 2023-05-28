<template>
  <div class="flex flex-col md:flex-row">
    <div class="md:w-2/3 p-4">
      <!-- アイコン・ユーザ名・投稿日 -->
      <div class="flex items-center mb-4">
        <!-- アイコン -->
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          class="w-8 h-8 rounded-full mr-2"
        />
        <!-- ユーザ名 -->
        <span v-if="userInfo" class="text-gray-600 text-sm">{{
          userInfo.username
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
          <span>読み込み中</span>
        </template>
      </div>

      <div class="flex justify-end space-x-4">
        <!-- <MyComponent
          :userId="userId"
          :articleId="articleId"
          :showLikeButton="showLikeButton"
        /> -->
        <button
          @click="countLike"
          v-if="showLikeButton"
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
        <button
          @click="countRecommend"
          class="bg-[#1D8EB9] border-indigo-700 px-4 py-2 rounded-md text-base text-white border hover:text-gray-900"
        >
          Qiitaオススメ
        </button>
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
import MyComponent from "@/components/ClickButton.vue";
import { ref, onMounted } from "vue";
import { marked } from "marked";

const route = useRoute();
const supabase = useSupabaseClient();
const users = useSupabaseUser();
const router = useRouter();

const userId = users.value?.id;
let userInfo = ref();
let articleId = route.params.id;

// ユーザセッションid取得
(async () => {
  if (userId) {
    let { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);
    userInfo.value = await data[0];
  }
})();

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

  // タグ名を格納する配列
  // let tagNames = ref([]);

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
})();

//　　　　　　　おすすめ数表示機能　　　　　　　　　　//
const recommendCount = ref(0);

//おすすめ数を取得する関数
const Recommend = async () => {
  let { data, error } = await supabase
    .from("recommend")
    .select("*")
    .eq("articleId", articleId);
  return data.length;
};
recommendCount.value = await Recommend();

const countRecommend = async () => {
  try {
    // Likeテーブルにデータを挿入
    await supabase.from("recommend").insert({ userId, articleId });
    // Commentテーブルから該当する記事のコメントを取得;
    const { data, error } = await supabase
      .from("recommend")
      .select("*")
      .eq("articleId", articleId);
    recommendCount.value = data.length;
    router.go();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//　　　　　　　いいね数表示機能　　　　　　　　　　//
// いいねの件数を表示するためのリアクティブな変数
const likeCount = ref(0);
const showLikeButton = ref(false);

//いいね数を取得する関数
const Like = async () => {
  let { data, error } = await supabase
    .from("like")
    .select("*")
    .eq("articleId", articleId);

  const confirmation = await supabase
    .from("like")
    .select("*")
    .eq("userId", userId);

  if (!confirmation.data[0]) {
    showLikeButton.value = true;
  }
  return data.length;
};
likeCount.value = await Like();

//いいね数をカウントする関数
const countLike = async () => {
  try {
    //すでにいいねを押しているのか確認
    const confirmation = await supabase
      .from("like")
      .select("*")
      .eq("userId", userId);
    if (!confirmation.data[0]) {
      // Likeテーブルにデータを挿入
      await supabase.from("like").insert({ userId, articleId });
      router.go();
    } else {
      //いいね数を削除する
      await supabase
        .from("like")
        .delete()
        .eq("userId", userId)
        .eq("articleId", articleId);
      router.go();
      displayLike.value = true;
    }
    //Commentテーブルから該当する記事のいいね数を取得
    const { data, error } = await supabase
      .from("like")
      .select("*")
      .eq("articleId", articleId);
    likeCount.value = data.length;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//目標いいねに到達してたら「達成」。それ以外は残り件数表示する
const articleDataGoalLike = Number(articleData.value[0].goalLike);
goalLike.value =
  Number(articleData.value[0].goalLike) - likeCount.value > 0
    ? `${Number(articleData.value[0].goalLike) - likeCount.value}`
    : "達成";

//　　　　　　　　コメント機能　　　　　　　　　//
//投稿済みコメントを取得
const commentData = async () => {
  let { data } = await supabase
    .from("comment")
    .select("*")
    .eq("articleId", articleId);
  // dataのループ処理 map
  await Promise.all(
    data.map(async (item) => {
      let { data: users } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", item.userId);
      item.username = users[0].username;
    })
  );
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

// //コメントを削除
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
