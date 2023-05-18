<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="flex">
      <!-- カテゴリ検索欄 -->
      <!-- プログラミング言語 -->
      <div class="flex flex-col">
        <div class="pt-24 mr-5">
          <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
            プログラミング言語
          </h3>
          <ul
            class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="vue-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="vue-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Vue JS</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="react-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="react-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >React</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="angular-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="angular-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Angular</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="laravel-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="laravel-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Laravel</label
                >
              </div>
            </li>
          </ul>
        </div>
        <!-- 職種 -->
        <div class="pt-12 mr-5">
          <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">職種</h3>
          <ul
            class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="vue-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="vue-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >FR</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="react-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="react-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >ML</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="angular-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="angular-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Java</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="laravel-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="laravel-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >PHP</label
                >
              </div>
            </li>
          </ul>
        </div>
        <!-- サークル -->
        <div class="pt-12 mr-5">
          <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
            サークル
          </h3>
          <ul
            class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="vue-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="vue-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >サークル名</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="react-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="react-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >サークル名</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="angular-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="angular-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >サークル名</label
                >
              </div>
            </li>
            <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center pl-3">
                <input
                  id="laravel-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="laravel-checkbox"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >サークル名</label
                >
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <!-- アドベントカレンダーバナー -->
        <div
          class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg shadow-lg flex items-center justify-between"
        >
          <!-- メッセージ -->
          <div class="text-white font-bold text-xl">
            <p class="ml-5">Qiita Builder Advent Calendar</p>
            <p class="ml-5">開催中</p>
          </div>
          <!-- ビジュアル -->
          <!-- サンプル画像 -->
          <img
            src="https://picsum.photos/200/150?random=2"
            alt="朝焼けの線路"
            width="200"
            height="150"
            class="rounded-lg"
          />
        </div>
        <!-- ソート機能 -->
        <div class="flex justify-end">
          <div class="inline-flex rounded-md shadow-sm pt-5 pb-3" role="group">
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-200 rounded-l-lg hover:bg-[#1D8EB9] hover:text-white focus:z-10 focus:ring-2 focus:ring-[#1D8EB9] focus:bg-[#1D8EB9] focus:text-white focus:border-[#1D8EB9] dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              新着順
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-200 hover:bg-[#1D8EB9] hover:text-white focus:z-10 focus:ring-2 focus:ring-[#1D8EB9] focus:bg-[#1D8EB9] focus:text-white focus:border-[#1D8EB9] dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              投稿日順
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-200 rounded-r-md hover:bg-[#1D8EB9] hover:text-white focus:z-10 focus:ring-2 focus:ring-[#1D8EB9] focus:bg-[#1D8EB9] focus:text-white focus:border-[#1D8EB9] dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              いいね数
            </button>
          </div>
        </div>
        <!-- 記事一覧 -->
        <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 pb-24 mx-auto">
            <div class="-my-8 divide-y-2 divide-gray-100">
              <div class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700"
                    >CATEGORY</span
                  >
                  <span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                </div>
                <div class="md:flex-grow">
                  <h2
                    class="text-2xl font-medium text-gray-900 title-font mb-2"
                  >
                    見出し
                  </h2>
                  <p class="leading-relaxed">
                    記事小見出し記事小見出し記事小見出し記事小見出し記事小見出し記事小見出し(どこまで表示するか制限必要)
                  </p>
                  <a class="text-indigo-500 inline-flex items-center mt-4"
                    >記事詳細
                    <svg
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700"
                    >CATEGORY</span
                  >
                  <span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                </div>
                <div class="md:flex-grow">
                  <h2
                    class="text-2xl font-medium text-gray-900 title-font mb-2"
                  >
                    見出し
                  </h2>
                  <p class="leading-relaxed">
                    記事小見出し記事小見出し記事小見出し記事小見出し記事小見出し記事小見出し(どこまで表示するか制限必要)
                  </p>
                  <a class="text-indigo-500 inline-flex items-center mt-4"
                    >記事詳細
                    <svg
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="py-8 flex flex-wrap md:flex-nowrap">
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700"
                    >CATEGORY</span
                  >
                  <span class="text-sm text-gray-500">12 Jun 2019</span>
                </div>
                <div class="md:flex-grow">
                  <h2
                    class="text-2xl font-medium text-gray-900 title-font mb-2"
                  >
                    見出し
                  </h2>
                  <p class="leading-relaxed">
                    記事小見出し記事小見出し記事小見出し記事小見出し記事小見出し記事小見出し(どこまで表示するか制限必要)
                  </p>
                  <a class="text-indigo-500 inline-flex items-center mt-4"
                    >記事詳細
                    <svg
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
