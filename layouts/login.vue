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

  <footer class="bg-[#1D8EB9] py-4">
    <div class="container mx-auto px-4">
      <p class="text-center text-white">&copy; 2023 Qiita builder.</p>
    </div>
  </footer>
</template>
