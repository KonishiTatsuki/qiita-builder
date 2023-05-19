<template>
  <header class="text-white bg-[#1D8EB9] body-font max-w-full mx-auto">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <NuxtLink
        to="/"
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <span class="ml-3 text-xl text-white">Qiita Builder</span>
      </NuxtLink>
      <input
        type="text"
        class="bg-white text-gray-900 rounded-full py-2 px-4 focus:outline-none focus:shadow-outline m-4"
        placeholder="検索"
      />
      <nav
        class="md:ml-auto flex flex-wrap items-center text-base justify-center"
      >
        <ul class="flex gap-4">
          <li class="mr-5 hover:text-gray-900">
            <NuxtLink to="/">ログアウト</NuxtLink>
          </li>
          <li class="mr-5 hover:text-gray-900">
            <NuxtLink to="/">マイページ</NuxtLink>
          </li>
          <li class="mr-5 hover:text-gray-900">
            <NuxtLink to="/">投稿する</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- output the page content -->
  <div class="body">
    <slot />
  </div>

  <footer class="bg-[#1D8EB9] py-4 mt-11">
    <div class="container mx-auto px-4">
      <p class="text-center text-white">&copy; 2023 Qiita builder.</p>
    </div>
  </footer>
</template>
