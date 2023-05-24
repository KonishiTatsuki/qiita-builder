<template>
  <div class="max-w-screen-xl mx-auto">
    <div class="flex">
      <!-- カテゴリ検索欄 -->
      <div class="flex flex-col">
        <!-- プログラミング言語 -->
        <div class="pt-12 mr-5">
          <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">
            プログラミング言語
          </h3>
          <ul
            class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
              v-for="(tag, index) in tagName"
              :key="index"
              v-show="index < visibleTagItems"
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
                  >{{ tag.name }}</label
                >
              </div>
            </li>
          </ul>
          <div v-if="tagName.length > 10" class="text-right">
            <button
              class="text-blue-600 text-sm font-medium"
              @click="toggleShowAllTagItems"
            >
              {{ showAllTagItems ? "閉じる" : "もっと見る" }}
            </button>
          </div>
        </div>
        <!-- 職種 -->
        <div class="pt-12 mr-5">
          <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">職種</h3>
          <ul
            class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
              v-for="(occupation, index) in occupationName"
              :key="index"
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
                  >{{ occupation.occupationName }}</label
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
              v-for="(club, index) in clubName"
              :key="index"
              v-show="index < visibleClubItems"
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
                  >{{ club.clubName }}</label
                >
              </div>
            </li>
          </ul>
          <div v-if="clubName.length > 10" class="text-right">
            <button
              class="text-blue-600 text-sm font-medium"
              @click="toggleShowAllClubItems"
            >
              {{ showAllClubItems ? "閉じる" : "もっと見る" }}
            </button>
          </div>
        </div>
      </div>

      <div>
        <!-- アドベントカレンダーバナー -->
        <div
          class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg shadow-lg flex items-center justify-between mt-3"
        >
          <!-- メッセージ -->
          <div class="text-white font-bold title">
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
              <div
                class="py-8 flex flex-wrap md:flex-nowrap"
                v-for="article in combinedData"
                :key="article.id"
              >
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700">{{
                    article.tags[0].name
                  }}</span>
                  <span class="mt-1 text-gray-500 text-sm">{{
                    article.date
                  }}</span>
                </div>
                <div class="md:flex-grow">
                  <h2 class="title font-medium text-gray-900 title-font mb-2">
                    {{ article.title }}
                  </h2>
                  <p class="leading-relaxed">
                    {{ article.body }}
                  </p>
                  <div class="flex justify-between items-center mt-4">
                    <a class="text-indigo-500 inline-flex items-center"
                      >記事詳細&nbsp;→
                    </a>
                    <button class="btn" @click="deleteArticle(article)">
                      削除(管理者のみ表示)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const supabase = useSupabaseClient();

// Supabaseからプログラミング言語名(display:trueのみ)を取得
let tagName = ref("");
let visibleTagItems = ref(10);
let showAllTagItems = ref(false);

(async function () {
  let { data: name, error } = await supabase
    .from("tag")
    .select("name")
    .eq("display", "true");
  tagName.value = name;
})();

const toggleShowAllTagItems = () => {
  if (showAllTagItems.value) {
    visibleTagItems.value = 10;
    showAllTagItems.value = false;
  } else {
    visibleTagItems.value = tagName.value.length;
    showAllTagItems.value = true;
  }
};

// Supabaseから職種データの職種名を取得
let occupationName = ref("");
(async function () {
  let { data: occupation, error } = await supabase
    .from("occupation")
    .select("occupationName");
  occupationName.value = occupation;
})();

// Supabaseからサークルデータの職種名を取得
let clubName = ref("");
let visibleClubItems = ref(10);
let showAllClubItems = ref(false);

(async function () {
  let { data: club, error } = await supabase
    .from("club")
    .select("clubName")
    .eq("display", "true");
  clubName.value = club;
})();

const toggleShowAllClubItems = () => {
  if (showAllClubItems.value) {
    visibleClubItems.value = 10;
    showAllClubItems.value = false;
  } else {
    visibleClubItems.value = clubName.value.length;
    showAllClubItems.value = true;
  }
};

const deleteArticle = (article) => {
  console.log("deleteArticleボタン発火");
  console.log(article);
};

const article = [
  {
    id: 1,
    userId: 1,
    date: "2023-05-19T12:34:56Z",
    title: "articleId1のtitle",
    clubTagId: 1,
    occupationTagId: 1,
    body: "articleId1のbody",
    goalLIke: 1,
    qiitaPost: true,
    publishDate: "2023-05-19T12:34:56Z",
    publish: true,
    bannerId: 1,
    delete: true,
  },
  {
    id: 2,
    userId: 2,
    date: "2023-05-20T12:34:56Z",
    title: "articleId2のtitle",
    clubTagId: 2,
    occupationTagId: 2,
    body: "articleId2のbody",
    goalLIke: 2,
    qiitaPost: false,
    publishDate: "2023-05-20T12:34:56Z",
    publish: false,
    bannerId: 2,
    delete: false,
  },
];

const tagging = [
  {
    id: 1,
    articleId: 1,
    tagId: 1,
  },
  {
    id: 2,
    articleId: 2,
    tagId: 2,
  },
];

const tag = [
  {
    id: 1,
    name: "tagId1のname",
    code: "tagId1のcode",
  },
  {
    id: 2,
    name: "tagId2のname",
    code: "tagId2のcode",
  },
];

const combinedData = article.map((item) => {
  const tags = tagging
    .filter((tagItem) => tagItem.articleId === item.id)
    .map((tagItem) => {
      const matchedTag = tag.find((t) => t.id === tagItem.tagId);
      return {
        id: matchedTag.id,
        name: matchedTag.name,
        code: matchedTag.code,
      };
    });

  return {
    ...item,
    tags: tags,
  };
});

console.log(combinedData);
</script>
