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
        <span class="text-gray-600 text-sm">{{ user[0].userName }}</span>
        <span class="text-gray-400 text-sm mx-2">・</span>
        <!-- 投稿日 -->
        <span class="text-gray-600 text-sm">{{ article[0].date }}</span>
      </div>
      <!-- 記事タイトル -->
      <h1 class="text-4xl font-bold mb-2">{{ article[0].title }}</h1>
      <hr class="border-t-2 border-gray-200" />
      <!-- カテゴリタグ -->
      <div class="flex space-x-2 m-4">
        <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded">{{
          tag[0].name
        }}</span>
        <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded">{{
          tag[1].name
        }}</span>
      </div>

      <div class="text-gray-800 mb-4">
        <!-- tailwindcssのスタイルを無効化するcustom-proseクラス -->
        <span class="custom-prose" v-html="htmlText"></span>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          @click="countLike"
          class="bg-red-500 border-indigo-700 px-4 py-2 rounded-md text-base text-white border hover:text-gray-900"
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
        <p class="text-red-500 text-4xl font-bold flex justify-center m-4">
          {{ goalLike }}
          <span
            class="text-lg text-gray-600 align-text-bottom pt-3"
            v-show="goalLike !== '達成'"
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
        v-model="commentContent"
        name="commentContent"
        id="commentContent"
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
    <!-- コメントがある場合のみ表示 -->
    <div v-show="result">
      <h2 class="text-xl font-bold mb-2">投稿済みのコメント</h2>
      <!-- 過去のコメントを表示するループ -->
      <div class="bg-gray-200 p-2 rounded my-3">
        <span class="font-semibold">{{ result[1][0].userName }}</span>
        <span class="text-gray-600 float-right"
          >{{ result[1][0].date }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="text-gray-600">削除</button>
        </span>
        <p class="text-gray-600">{{ result[1][0].comment }}</p>
      </div>
      <!-- 過去のコメントを表示するループ終了 -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { marked } from "marked";
const route = useRoute();

const supabase = useSupabaseClient();

let sessionUserId = ref("");
(async () => {
  let data = await supabase.auth.getSession();
  console.log(data);
  console.log(data.data.session.user.id);
  sessionUserId = data.data.session.user.id;
  // if (data) {
  //   const { error } = await supabase
  //     .from("profiles")
  //     .update({ qiitaToken: text.value })
  //     .eq("id", data.data.session.user.id);
  // }
})();

let articleData = ref();
let htmlText = ref();

(async () => {
  //記事ID取得
  let dynamicPageId = await route.params.id;

  let { data, error } = await supabase
    .from("article")
    .select("*")
    .eq("id", dynamicPageId);
  articleData.value = await data;
  console.log(articleData.value);

  htmlText.value = await marked.parse(articleData.value[0].body);
  console.log(htmlText.value);
})();

// onMounted(async () => {
//   htmlText.value = await marked.parse(articleData.value[0].body);
//   console.log(htmlText.value);
// })

const article = [
  {
    id: 1,
    userId: 1,
    date: "2023-05-24T02:26:27.716Z",
    title: "articleId1のtitle",
    clubTagId: 1,
    occupationTagId: 1,
    body: "**articleId1のbody**\n*fff*\n# fff\n> fff\n* fff\n1. fff\n2. fff\n[fff](https://)\n![fff](https://)\n",
    goalLIke: 1,
    qiitaPost: true,
    publishDate: "2023-05-25",
    publish: true,
    bannerId: 1,
    delete: true,
    goalLike: "5",
  }
];

// let htmlText = marked.parse(article[0].body);
// console.log(htmlText);

const tagging = [
  {
    id: 1,
    articleId: 1,
    tagId: 1,
  },
  {
    id: 2,
    articleId: 2,
    tagId: 2,
  },
];

const tag = [
  {
    id: 1,
    name: "tagId1のname",
    code: "tagId1のcode",
  },
  {
    id: 2,
    name: "tagId2のname",
    code: "tagId2のcode",
  },
];

const user = [
  {
    id: 1,
    userName: "userName1",
    email: "userName1@userName1.com",
    password: "userName1",
    clubId: 1,
    addClubId: 1,
    occupationId: 1,
    detail: "userName1の自己紹介文自己紹介文自己紹介文自己紹介文",
    qiitaToken: "userName1",
    authority: true,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    userName: "userName2",
    email: "userName2@userName2.com",
    password: "userName2",
    clubId: 2,
    addClubId: 2,
    occupationId: 2,
    detail: "userName2の自己紹介文自己紹介文自己紹介文自己紹介文",
    qiitaToken: "userName2",
    authority: false,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const like = [
  {
    id: 1,
    userId: 1,
    articleId: 1,
  },
  {
    id: 2,
    userId: 2,
    articleId: 2,
  },
  {
    id: 3,
    userId: 2,
    articleId: 1,
  },
];

const recommend = [
  {
    id: 1,
    userId: 1,
    articleId: 1,
  },
  {
    id: 2,
    userId: 2,
    articleId: 2,
  },
];

const comment = [
  {
    id: 1,
    userID: 1,
    date: "2023-05-19T12:34:56Z",
    comment: "commentId1のcomment",
    articleId: 1,
  },
  {
    id: 2,
    userID: 2,
    date: "2023-05-20T12:34:56Z",
    comment: "commentId2のcomment",
    articleId: 2,
  },
];

// いいね!した人のuserIdと、いいね！した記事のarticleIdの保存
let userId = user[0].id;
let articleId = article[0].id;

const countLike = async () => {
  let { data, error } = await supabase
    .from("like")
    .insert({ userId, articleId });
};

// Qiitaオススメした人のuserIdと、Qiitaオススメした記事のarticleIdの保存
const countRecommend = async () => {
  let { data, error } = await supabase
    .from("recommend")
    .insert({ userId, articleId });
};

// コメントデータをarticleId毎にグループ化
const commentData = {};
comment.forEach((c) => {
  if (!commentData[c.articleId]) {
    commentData[c.articleId] = [];
  }
  commentData[c.articleId].push(c);
});

console.log(commentData);

// articleId毎にユーザー名、コメント内容、コメントの日付をまとめたデータを生成
const result = {};
Object.keys(commentData).forEach((articleId) => {
  const comments = commentData[articleId];
  result[articleId] = comments.map((c) => {
    const userObject = user.find((u) => u.id === c.userID);
    return {
      userName: userObject.userName,
      comment: c.comment,
      date: c.date,
    };
  });
});

// いいねの件数をカウントする関数
// (async () => {
//   let { data, error } = await supabase
//     .from("like")
//     .select("*")
//     .eq("articleId", `${this.id}`);;
//   console.log("データ取得完了");
// })();

const countLikes = (likes) => {
  const uniqueUserIds = [...new Set(likes.map((like) => like.userId))];
  return uniqueUserIds.length;
};

// Qiitaオススメの件数をカウントする関数
const countRecommends = (recommends) => {
  const uniqueUserIds = [
    ...new Set(recommends.map((recommend) => recommend.userId)),
  ];
  return uniqueUserIds.length;
};

// いいねの件数を表示するためのリアクティブな変数
const likeCount = ref(0);

// Qiitaオススメの件数を表示するためのリアクティブな変数
const recommendCount = ref(0);

// コンポーネントがマウントされた時にいいねの件数を計算する
onMounted(() => {
  likeCount.value = countLikes(like);
  recommendCount.value = countRecommends(recommend);
});

//目標いいねに到達してたら「達成」。それ以外は残り件数表示する
const goalLike = ref(null);
goalLike.value =
  article[0].goalLike - likeCount >= 0
    ? article[0].goalLike - likeCount
    : "達成";



//コメント投稿機能
//投稿日
let date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
date = `${year}/${month}/${day}`;
// const comment = ref("");
const commentContent = ref("");
const { data } = await supabase.auth.getSession();
// const userId = data.session.user.id
// const comment = ref("");
const { id } = route.params;
// const articleId = id;
const submit = async () => {
  let { data, error } = await supabase
    .from("comment")
    .insert({ date, userId, comment, articleId });
  console.log("recommendのinsert完了");
  console.log(error);
};


//コメントを削除
const deleteComment = async (id) => {
  let { data, error } = await supabase
    .from("comment")
    .delete()
    .match({ id: id });
  console.log("commentのdelete完了");
  console.log(error);
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