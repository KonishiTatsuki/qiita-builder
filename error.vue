<template>
  <header class="text-white bg-[#1D8EB9] body-font max-w-full mx-auto">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <NuxtLink
        to="/"
        class="flex title-font font-medium items-center text-gray-900 md:mb-0"
      >
        <span class="ml-3 text-xl text-white">Qiita Builder</span>
      </NuxtLink>
    </div>
  </header>
  <!-- output the page content -->
  <div class="body">
    <slot />
  </div>
  <div class="main flex justify-center items-center">
    <div>
      <div class="stack">
        <h1>404</h1>
        <p class="error-message">{{ errorJ }}</p>
        <p class="error-message">{{ error?.message }}</p>
        <NuxtLink to="/"><div class="test">ホームへ戻る</div></NuxtLink>
      </div>
    </div>
  </div>
  <footer class="bg-[#1D8EB9] py-4 mt-[44px]">
    <div class="container mx-auto px-4">
      <p class="text-center text-white">&copy; 2023 Qiita builder.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
definePageMeta({ layout: "login" });
let error = useError();
const errorJ = "お探しのページは見つかりません。";
</script>

<style scoped>
.stack {
  text-align: center;
}

h1 {
  font-size: 6rem;
  letter-spacing: 0.5rem;
  text-align: center;
  line-height: 1;
}

.error-message {
  font-weight: lighter;
}

.test {
  text-decoration: underline;
  margin-top: 20px;
}
</style>
