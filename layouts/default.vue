<template>
  <header
    class="text-white bg-[#1D8EB9] body-font max-w-full mx-auto h-[68px] flex items-center"
  >
    <div
      class="container mx-auto flex flex-wrap flex-col md:flex-row items-center"
    >
    <div class="flex items-center md:mb-0">
      <NuxtLink to="/">
        <span class="ml-3 text-xl hover:text-gray-900">Qiita Builder</span>
      </NuxtLink>
        <div v-if="loginUser" class="ml-5 flex flex-col">
          <span class="text-sm text-white">ログイン中</span
          ><span class="text-base"
            >
            <img
              v-if="loginUser[0].image"
              :src="loginUser[0].image"
              alt="Icon"
              class="w-5 h-5 rounded-full inline mb-1"
            />
            {{
              loginUser[0].username.length > 15
                ? loginUser[0].username.slice(0, 15) + "..."
                : loginUser[0].username
            }}</span
          >
        </div>
      </div>
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
    <div class="container mx-auto">
      <p class="text-center text-white">&copy; 2023 Qiita builder.</p>
    </div>
  </footer>
</template>

<script setup>
import SearchArticle from "../components/SearchArticle.vue";
const router = useRouter();
const client = useSupabaseClient();
const user = useSupabaseUser();
const userId = user.value?.id;
const userName = ref("");

const logout = async () => {
  const { error } = await client.auth.signOut();
  console.log("ログアウト", error);
  router.push("/login");
};

const { data: loginUser } = await useFetch("/api/user/userGet", {
  method: "POST",
  body: userId,
});
console.log(loginUser.value[0]);
console.log(loginUser.value[0].username);
</script>
