<template>
  <header class="text-white bg-[#1D8EB9] body-font max-w-full mx-auto h-[68px] flex items-center">
    <div
      class="container mx-auto flex flex-wrap flex-col md:flex-row items-center"
    >
      <NuxtLink
        to="/"
        class="flex title-font font-medium items-center text-gray-900 md:mb-0"
      >
        <span class="ml-3 text-xl text-white">Qiita Builder</span>
      </NuxtLink>
      <!-- 記事一覧ページのみで検索ボックスを表示 -->
      <template v-if="$route.path === '/'">
        <div class="absolute absolute left-1/2 transform -translate-x-1/2">
          <SearchArticle />
        </div>
      </template>
      <nav
        class="md:ml-auto flex flex-wrap items-center text-base justify-center"
      >
        <ul class="flex gap-4">
          <li class="mr-5 hover:text-gray-900">
            <NuxtLink to="/" @click="logout">ログアウト</NuxtLink>
          </li>
          <li class="mr-5 hover:text-gray-900">
            <NuxtLink to="/myPage">マイページ</NuxtLink>
          </li>
          <li class="mr-5 hover:text-gray-900">
            <NuxtLink to="/articles/new">投稿する</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- output the page content -->
  <div class="body">
    <slot />
  </div>

  <footer class="bg-[#1D8EB9] h-[56px] mt-[44px] flex items-center">
    <div class="container mx-auto ">
      <p class="text-center text-white">&copy; 2023 Qiita builder.</p>
    </div>
  </footer>
</template>

<script setup>
import SearchArticle from "../components/SearchArticle.vue";
const router = useRouter();
const client = useSupabaseClient();
const logout = async () => {
  const { error } = await client.auth.signOut();
  console.log("ログアウト", error);
  router.push("/login");
};
</script>
