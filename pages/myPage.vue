<template>
  <div class="flex main pt-10">
    <div class="flex-auto">
      <div class="flex justify-between">
        <div class="w-full pr-[100px]">
          <div>
            <p>投稿記事一覧</p>
            <hr class="mb-[20px]" />
            <ul class="min-h-[250px]">
              <li
                v-for="article in myArticleArray"
                class="flex items-center justify-between mb-[10px]"
              >
                <NuxtLink :to="`/articleDetail/${article.id}`">
                  <p class="ml-[10px] font-bold">{{ article.title }}</p>
                </NuxtLink>
                <div class="flex items-center">
                  <NuxtLink :to="`/articles/edit/${article.id}`">
                    <button type="submit" class="btn mr-[30px] w-[80px]">
                      編集
                    </button>
                  </NuxtLink>
                  <div v-if="article.qiitaPost" class="w-32">Qiita投稿済み</div>
                  <div v-else-if="!article.publish" class="w-32">下書き</div>
                  <div v-else class="w-32"></div>
                </div>
              </li>
            </ul>

            <p>いいねした記事一覧</p>
            <hr class="mb-5" />
            <ul class="min-h-[250px]">
              <li
                v-for="article in myLikeArray"
                class="my-4 flex justify-between"
              >
                <p class="ml-[10px] mr-5 font-bold">{{ article.title }}</p>
                <NuxtLink
                  :to="`/articleDetail/${article.id}`"
                  class="text-indigo-500 inline-flex items-center"
                  >記事詳細&nbsp;→</NuxtLink
                >
              </li>
            </ul>
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
const users = useSupabaseUser();
const userId = users.value?.id;

//ユーザー情報を取得
const { data: user } = await useFetch("/api/user/get", {
  method: "POST",
  body: userId,
});
const authority = user.value[0].authority;

//いいねした記事を取得
const { data: likeArticleArray } = await useFetch(
  `/api/like/get?userId=${userId}`
);
const myLikeArray = likeArticleArray.value;

//自分が書いた記事を取得
const { data: myArticle } = await useFetch(
  `/api/article/mypage/get?userId=${userId}`
);
const myArticleArray = myArticle.value;
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
