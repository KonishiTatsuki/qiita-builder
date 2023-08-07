<template>
  <div>いいねボタンテスト</div>
  <LikeButton
    :userId="userId"
    :articleId="Number(articleId)"
    :showLikeButton="showLikeButton"
    :nowLike="nowLike"
    :goalLike="goalLike"
    @eventEmit="ChangeNowLike"
  />
</template>

<script setup>
// import LikeButton from "~/components/LikeButton.vue";
import LikeButton from "../LikeButton.vue";
import axios from "axios";
import { ref } from "vue";

const nowLike = ref(0);
let articleData = ref();
//いいね数表示機能
const showLikeButton = ref(false);
const goalLikeSuccess = ref("");
let articleId = 188;
let tagNames = ref();
const goalLike = ref();

const users = ref({
  id: "445a6d2e-5cc3-47c6-b5fe-2c6179b229da",
  email: "tatsuki.konishi@rakus-partners.co.jp",
});
let userId = "";
if (users.value) {
  userId = users.value.id;
}

const articleBody = ref();
const articleTitle = ref();
const articleTag = ref();
const articleQiitaPost = ref();

//記事の目標いいね取得
const articleDataGoalLike = ref();
//Qiita投稿済みかどうか確認
const qiitaPostCheck = ref();

const tagIdsAxios = ref();
const tagsAxios = ref();
const articleDatasAxios = ref();


const tagFn = async () => {
  // const { data: tagIds } = await useFetch("/api/tagging/get", {
  //   method: "POST",
  //   body: articleId,
  // });
  tagIdsAxios.value = await axios.post(
    "http://localhost:3000/api/tagging/get",
    // "/api/tagging/get",
    articleId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // const { data: tags } = await useFetch("/api/tag/get", {
  //   method: "POST",
  //   body: tagIds.value,
  // });
  tagsAxios.value = await axios.post(
    "http://localhost:3000/api/tag/get",
    // "/api/tag/get",
    tagIdsAxios.value.data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // // tagNames.value = tags.value;
  tagNames.value = tagsAxios.value.data;

  // const { data: articleDatas } = await useFetch("/api/article/articleDateGet", {
  //   method: "POST",
  //   body: articleId,
  // });
  articleDatasAxios.value = await axios.post(
    "http://localhost:3000/api/article/articleDateGet",
    // "/api/article/articleDateGet",
    articleId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // // // articleData.value = articleDatas.value[0];
  articleData.value = articleDatasAxios.value.data[0];

  articleBody.value = articleData.value.body;
  articleTitle.value = articleData.value.title;
  articleTag.value = Object.keys(tagNames.value).map((key) => {
    return { name: tagNames.value[key] };
  });
  articleQiitaPost.value = articleData.value.qiitaPost;

  // //記事の目標いいね取得
  articleDataGoalLike.value = Number(articleData.value.goalLike);
  console.log("articleDataGoalLike.value", articleDataGoalLike.value);
  // //Qiita投稿済みかどうか確認
  qiitaPostCheck.value = articleData.value.qiitaPost;
};
tagFn();

const qiitaPostItemAxios = ref();

const ChangeNowLike = async (val) => {
  //クリックによるいいね数の変更
  nowLike.value = val.nowLike;

  //   // 記事がQiita投稿済みかどうか確認;
  //   // const { data: qiitaPostItem } = await useFetch(
  //   //   "/api/article/articleDateGet",
  //   //   {
  //   //     method: "POST",
  //   //     body: articleId,
  //   //   }
  //   // );
  qiitaPostItemAxios.value = await axios.post(
    "http://localhost:3000/api/article/articleDateGet",
    // "/api/article/articleDateGet",
    articleId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  await new Promise((r) => setTimeout(r, 100));
  //   //目標いいねをせているか確認
  if (
    // qiitaPostItem.value[0].goalLike === null ||
    // qiitaPostItem.value[0].goalLike === ""
    qiitaPostItemAxios.value.data[0].goalLike === null ||
    qiitaPostItemAxios.value.data[0].goalLike === ""
  ) {
    goalLike.value = null;
  } else {
    if (
      // articleDataGoalLike - nowLike.value <= 0 &&
      // !qiitaPostItem.value[0].qiitaPost
      articleDataGoalLike.value - nowLike.value <= 0 &&
      !qiitaPostItemAxios.value.data[0].qiitaPost
    ) {
      ///自動投稿
      goalLikeSuccess.value = "達成済み";
      qiitaPostCheck.value = true;
      const autoPost = () => {
        const item = {
          body: articleBody.value, // マークダウン形式で記載が必要
          private: false, // 限定共有状態かどうかを表すフラグ (Qiita Teamでは無効)
          tags: "articleTag.value",
          title: articleTitle.value,
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
      autoPost();
      // await useFetch("/api/article/qiitaPostUpdate", {
      //   method: "POST",
      //   body: articleId,
      // });
      await axios.post(
        "http://localhost:3000/api/article/qiitaPostUpdate",
        // "/api/article/qiitaPostUpdate",
        articleId,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // if (qiitaPostItem.value[0].qiitaPost) {
      if (qiitaPostItemAxios.value.data[0].qiitaPost) {
        goalLikeSuccess.value = "達成済み";
      } else {
        goalLike.value = articleDataGoalLike.value - nowLike.value;
      }
      console.log("まだ達成してないよ/もしくはQiitaに投稿済み");
    }
  }
};
</script>
