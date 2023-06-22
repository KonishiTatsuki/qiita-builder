<template>
  <div class="flex main pt-10">
    <div class="flex-auto">
      <div class="flex justify-between">
        <div class="w-full pr-[100px]">
          <div class="mb-16">
            <span
              class="mdi mdi-note-edit-outline text-2xl text-grey-500"
            ></span>
            <span class="text-2xl mb-4 ml-10">投稿記事一覧</span>
            <hr class="my-5" />
            <ul class="min-h-[250px]">
              <li
                v-for="(article, index) in visiblePostItems"
                :key="article.id"
                class="flex items-center justify-between mb-[10px]"
              >
                <span class="mdi mdi-chevron-right w-1/12 text-blue-500"></span>
                <NuxtLink :to="`/articleDetail/${article.id}`" class="w-8/12">
                  <p class="font-bold">{{ article.title }}</p>
                </NuxtLink>
                <div class="flex items-center">
                  <NuxtLink :to="`/articles/edit/${article.id}`">
                    <button type="submit" class="btn mr-[30px] w-[80px] w-3/12">
                      編集
                    </button>
                  </NuxtLink>
                  <div v-if="article.qiitaPost" class="w-32">Qiita投稿済み</div>
                  <div v-else-if="!article.publish" class="w-32">下書き</div>
                  <div v-else class="w-32"></div>
                </div>
              </li>
            </ul>
            <button
              v-show="showMorePostItemsButton"
              @click="showMorePostItems"
              class="mt-4 underline decoration-sky-500"
            >
              もっと見る
            </button>
            <button
              v-show="showClosePostItemsButton"
              @click="closePostItemsAccordion"
              class="mt-4 underline decoration-sky-500"
            >
              閉じる
            </button>
          </div>
          <div>
            <span
              class="mdi mdi-thumb-up-outline text-2xl text-grey-500"
            ></span>
            <span class="my-4 text-2xl ml-10">いいねした記事一覧</span>
            <hr class="my-5" />
            <ul class="min-h-[250px]">
              <li
                v-for="like in visibleLikeItems"
                :key="like.id"
                class="flex justify-between mb-[10px]"
              >
                <span class="mdi mdi-chevron-right w-1/12 text-blue-500"></span>
                <p class="ml-[10px] font-bold w-4/5 mb-[10px]">
                  {{ like.title }}
                </p>
                <NuxtLink
                  :to="`/articleDetail/${like.id}`"
                  class="text-indigo-500 inline-flex items-center w-1/5 justify-center"
                  >記事詳細&nbsp;→</NuxtLink
                >
              </li>
            </ul>
            <button
              v-show="showMoreLikeItemsButton"
              @click="showMoreLikeItems"
              class="mt-4 underline decoration-sky-500"
            >
              もっと見る
            </button>
            <button
              v-show="showCloseLikeItemsButton"
              @click="closeLikeItemsAccordion"
              class="mt-4 underline decoration-sky-500"
            >
              閉じる
            </button>
          </div>
        </div>
        <div class="w-[300px] mt-[50px]">
          <div>
            <NuxtLink :to="`/userEdit/${userId}`">
              <button type="submit" class="btn w-full mb-10">
                ユーザー情報確認
              </button>
            </NuxtLink>
          </div>
          <div v-if="authority">
            <NuxtLink to="/ownerPage">
              <button type="submit" class="btn w-full">管理者画面</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Article } from "~/types";

useHead({
  title: "マイページ",
});

const users = useSupabaseUser();
const userId = users.value?.id;

//ユーザー情報を取得
const { data: user } = await useFetch("/api/user/get", {
  method: "POST",
  body: userId,
});

const authority = user.value?.authority;

//自分が書いた記事の取得
let postItems: Article[] = reactive([]);
const postNum = ref(5);
const visiblePostItems = computed(() => postItems.slice(0, postNum.value));
const showMorePostItemsButton = computed(
  () => postItems.length > postNum.value
);
const showClosePostItemsButton = ref(false);

function showMorePostItems() {
  postNum.value += 5; // 5行ずつ追加する
  if (postItems.length <= postNum.value) {
    // showMorePostItemsButton.value = false;
    showClosePostItemsButton.value = true;
  }
}

function closePostItemsAccordion() {
  postNum.value = 5; // 初期表示に戻す
  showClosePostItemsButton.value = false;
  //   showMorePostItemsButton.value = true;
}

//　自分が書いた記事を取得
const { data: myArticle }: Article[] = await useFetch(
  `/api/article/mypage/get?userId=${userId}`
);
if (myArticle.value) {
  myArticle.value.map((item: Article) => {
    postItems.push(item); // レスポンスデータをitems配列に追加
  });
}

//いいねした記事の取得
let likeItems: { id: number; title: string }[] = reactive([]); // アコーディオンのアイテムのリスト
const likeNum = ref(5);
const visibleLikeItems = computed(() => likeItems.slice(0, likeNum.value));
const showMoreLikeItemsButton = computed(
  () => likeItems.length > likeNum.value
);
const showCloseLikeItemsButton = ref(false);

function showMoreLikeItems() {
  likeNum.value += 5; // 5行ずつ追加する
  if (likeItems.length <= likeNum.value) {
    // showMorePostItemsButton.value = false;
    showCloseLikeItemsButton.value = true;
  }
}

function closeLikeItemsAccordion() {
  likeNum.value = 5; // 初期表示に戻す
  showCloseLikeItemsButton.value = false;
  //   showMorePostItemsButton.value = true;
}

//いいねした記事を取得
const { data: likeArticleArray } = await useFetch(
  `/api/like/get?userId=${userId}`
);
if (likeArticleArray.value) {
  likeArticleArray.value.map((like: { id: number; title: string }) => {
    likeItems.push(like);
  });
}
</script>
