<template>
  <div class="flex main pt-10">
    <div class="flex-auto">
      <div class="flex justify-between">
        <div class="w-full pr-[100px]">
          <div>
            <ul class="min-h-[300px]">
              <li>投稿記事一覧</li>
              <hr class="mb-[20px]" />
              <li v-for="article in myArticleArray" class="flex items-center justify-between mb-[10px]">
                <NuxtLink :to="`/articleDetail/${article.id}`">
                  <p class="ml-[10px] font-bold">{{article.title}}</p>
                </NuxtLink>
                <div class="flex items-center">
                  <NuxtLink :to="`/articles/edit/${article.id}`">
                    <button type="submit" class="btn mr-[30px] w-[80px]">
                      編集
                    </button>
                  </NuxtLink>
                  <div v-if="article.qiitaPost" class="w-32">Qiita投稿済み</div>
                  <div v-else-if="!(article.publish)" class="w-32">下書き</div>
                  <div v-else class="w-32"></div>
                </div>
              </li>
            </ul>
            <ul class="my-10">
              <p>いいねした記事一覧</p>
              <hr class="mb-5" />
              <li v-for="article in articleArray" class="my-4 flex justify-between">
                <p class="ml-[10px] mr-5 font-bold">{{article.title}}</p>
                <NuxtLink :to="`/articleDetail/${article.id}`" class="text-indigo-500 inline-flex items-center"
                  >記事詳細&nbsp;→</NuxtLink>
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
          <div>
            <NuxtLink to="/ownerPage">
              <button type="submit" class="btn w-full">管理者画面</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const users = useSupabaseUser();
const userId = users.value.id;
const articleArray = []

const { data: likeArticleArray } = await useFetch(`/api/like/get?userId=${userId}`) 
likeArticleArray.value.map(async(likeArticle) => {
  const { data: likeArticleTitle } = await useFetch(`/api/article/like/get?id=${likeArticle.articleId}`) 
  likeArticleTitle.value.map((title) => {
    articleArray.push({ id: likeArticle.articleId, title: title.title})
  })
})

const { data: myArticle } = await useFetch(`/api/article/mypage/get?userId=${userId}`) 
const myArticleArray = myArticle.value
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
