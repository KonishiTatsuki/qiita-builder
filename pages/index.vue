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
                  :id="'tag-checkbox-' + index"
                  type="checkbox"
                  value="tag"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  v-model="tag.checked"
                  @change="filterArticlesByTag"
                />
                <label
                  :for="'tag-checkbox-' + index"
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
                  :id="'occupation-checkbox-' + index"
                  type="checkbox"
                  :value="occupation"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  v-model="occupation.checked"
                  @change="filterArticlesByOccupation"
                />
                <label
                  :for="'occupation-checkbox-' + index"
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
                  :id="'club-checkbox-' + index"
                  type="checkbox"
                  value="club"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  v-model="club.checked"
                  @change="filterArticlesByClub"
                />
                <label
                  :for="'club-checkbox-' + index"
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
          <NuxtLink to="/advent">
            <!-- メッセージ -->
            <div class="text-white font-bold title">
              <p class="ml-5">Qiita Builder Advent Calendar</p>
              <p class="ml-5">開催中</p>
            </div>
          </NuxtLink>
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
              @click="sortArticlesByDateDescending"
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-200 rounded-l-lg hover:bg-[#1D8EB9] hover:text-white focus:z-10 focus:ring-2 focus:ring-[#1D8EB9] focus:bg-[#1D8EB9] focus:text-white focus:border-[#1D8EB9] dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              新着順
            </button>
            <button
              @click="sortArticlesByDate"
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-200 hover:bg-[#1D8EB9] hover:text-white focus:z-10 focus:ring-2 focus:ring-[#1D8EB9] focus:bg-[#1D8EB9] focus:text-white focus:border-[#1D8EB9] dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              投稿日順
            </button>
            <button
              @click="sortByLikes"
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
                v-for="article in articleData"
                :key="article.id"
                v-show="
                  !article.hideByOccupation &
                  !article.hideByClub &
                  !article.hideByTag
                "
              >
                <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span class="font-semibold title-font text-gray-700">{{
                    article.username
                  }}</span>
                  <span class="mt-1 text-gray-500 text-sm">{{
                    formatDateTime(article.date)
                  }}</span>
                </div>
                <div class="md:flex-grow">
                  <h2 class="title font-medium text-gray-900 title-font mb-2">
                    {{ article.title }}
                  </h2>
                  <p class="leading-relaxed" id="custom-prose">
                    {{ article.body }}
                  </p>
                  <div class="flex justify-between items-center mt-4">
                    <router-link
                      :to="`/articleDetail/${article.id}`"
                      class="text-indigo-500 inline-flex items-center"
                    >
                      記事詳細&nbsp;→
                    </router-link>
                    <button
                      class="btn"
                      @click="deleteArticle(article.id)"
                      v-show="authority"
                    >
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
const userss = useSupabaseUser();
const userId = userss.value?.id;

//管理者権限があるか確認
const { data: userAuthority } = await supabase
  .from("profiles")
  .select("authority")
  .eq("id", userId);
const authority = userAuthority[0].authority;

// Supabaseからプログラミング言語名(display:trueのみ)を取得
let tagName = ref("");
let visibleTagItems = ref(10);
let showAllTagItems = ref(false);
let articleData = ref([]);
let likeData = ref([]);
let occupationName = ref("");
let clubName = ref("");
let visibleClubItems = ref(10);
let showAllClubItems = ref(false);

//articleデータ取得
(async () => {
  let { data } = await supabase
    .from("article")
    .select("body, clubTagId, date, delete, id, occupationTagId, title, userId")
    .eq("delete", false)
    .order("date", { ascending: false });

  // userIdを取得してユーザ名を取得する連想配列を作成
  const userIds = data
    .filter((article) => article.userId !== null) // nullを除外
    .map((article) => article.userId);
  const { data: users } = await supabase
    .from("profiles")
    .select("id, username")
    .in("id", userIds);
  const usernameMap = {};
  for (const user of users) {
    usernameMap[user.id] = user.username;
  }

  // data配列にusernameを追加
  articleData.value = data.map((article) => ({
    ...article,
    username: usernameMap[article.userId],
  }));

  // likeテーブルを取得し、articleData配列にいいね数が表示されたlikeプロパティを持たせる
  let { data: db, error } = await supabase.from("like").select("*");
  likeData.value = db;

  const likeTable = likeData.value.reduce((acc, like) => {
    const { articleId, userId } = like;
    if (!acc.hasOwnProperty(articleId)) {
      acc[articleId] = new Set();
    }
    acc[articleId].add(userId);
    return acc;
  }, {});

  articleData.value = await articleData.value.map((article) => ({
    ...article,
    like: likeTable[article.id] ? likeTable[article.id].size : 0,
    hideByOccupation: false,
    hideByClub: false,
    hideByTag: false,
  }));

  let { data: tags } = await supabase.from("tagging").select("tagId,articleId");

  // articleData配列の各要素に"tags"プロパティを追加する
  articleData.value.forEach((article) => {
    article.tags = [];
  });

  // tags配列をイテレートし、関連するarticleData要素にtagIdを追加する
  tags.forEach((tag) => {
    const articleId = tag.articleId;
    const article = articleData.value.find(
      (article) => article.id === articleId
    );
    if (article) {
      article.tags.push(tag.tagId);
    }
  });
  
  console.log(articleData.value);
})();

// Supabaseからtagテーブルデータを取得
(async function () {
  let { data: name, error } = await supabase
    .from("tag")
    .select("*")
    .eq("display", "true");
  tagName.value = name;

  // 全ての要素にcheckedプロパティを追加し、初期値を設定する
  tagName.value.forEach((tag) => {
    tag.checked = false;
  });

  console.log(tagName.value);
})();

// Supabaseから職種テーブルデータを取得
(async function () {
  let { data: occupation, error } = await supabase
    .from("occupation")
    .select("*");
  occupationName.value = occupation;

  // 全ての要素にcheckedプロパティを追加し、初期値を設定する
  occupationName.value.forEach((occupation) => {
    occupation.checked = false;
  });
})();

// Supabaseからサークルテーブルデータを取得
(async function () {
  let { data: club, error } = await supabase
    .from("club")
    .select("*")
    .eq("display", "true");
  clubName.value = club;

  // 全ての要素にcheckedプロパティを追加し、初期値を設定する
  clubName.value.forEach((club) => {
    club.checked = false;
  });
})();

// 記事データを投稿日順にソートする
const sortArticlesByDate = () => {
  articleData.value.sort((a, b) => new Date(a.date) - new Date(b.date));
};

// 記事データを新着順にソートする
const sortArticlesByDateDescending = () => {
  articleData.value.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// 記事データをいいね数の降順にソートする
const sortByLikes = () => {
  articleData.value.sort((a, b) => b.like - a.like);
};

// 職種をフィルターする関数
const filterArticlesByOccupation = () => {
  const selectedOccupations = occupationName.value
    .filter((occupation) => occupation.checked)
    .map((occupation) => occupation.id);

  articleData.value.forEach((article) => {
    if (selectedOccupations.length === 0) {
      // 選択された職種がない場合はすべての記事を表示
      article.hideByOccupation = false;
    } else {
      // 選択された職種と同じidの記事のみ表示
      article.hideByOccupation = !selectedOccupations.includes(
        article.occupationTagId
      );
    }
  });
};

// サークルをフィルターする関数
const filterArticlesByClub = () => {
  const selectedClubs = clubName.value
    .filter((club) => club.checked)
    .map((club) => club.id);

  articleData.value.forEach((article) => {
    if (selectedClubs.length === 0) {
      // 選択されたサークルがない場合はすべての記事を表示
      article.hideByClub = false;
    } else {
      // 選択されたサークルと同じidの記事のみ表示
      article.hideByClub = !selectedClubs.includes(article.clubTagId);
    }
  });
};

// プログラミング言語をフィルターする関数
const filterArticlesByTag = () => {
  const selectedTags = tagName.value
    .filter((tag) => tag.checked)
    .map((tag) => tag.id);

  articleData.value.forEach((article) => {
    if (selectedTags.length === 0) {
      // 選択されたプログラミング言語がない場合はすべての記事を表示
      article.hideByTag = false;
    } else {
      // 選択されたサークルと同じidの記事のみ表示
      // article.hideByTag = !selectedTags.includes(article.tags);
      // ↑ここ問題
      article.hideByTag = !article.tags.some((tag) =>
        selectedTags.includes(tag)
      );
    }
  });
};

const toggleShowAllTagItems = () => {
  if (showAllTagItems.value) {
    visibleTagItems.value = 10;
    showAllTagItems.value = false;
  } else {
    visibleTagItems.value = tagName.value.length;
    showAllTagItems.value = true;
  }
};

const toggleShowAllClubItems = () => {
  if (showAllClubItems.value) {
    visibleClubItems.value = 10;
    showAllClubItems.value = false;
  } else {
    visibleClubItems.value = clubName.value.length;
    showAllClubItems.value = true;
  }
};

//日時のスタイル変更
function formatDateTime(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };
  const dateObject = new Date(dateString);
  const formattedDate = dateObject.toLocaleString("ja-JP", options);
  return formattedDate;
}

// 管理者による記事削除
const router = useRouter();
const deleteArticle = async (id) => {
  await supabase.from("article").upsert({ id: id, delete: true });
  router.go();
};
</script>

<style>
#custom-prose * {
  all: revert;
}
</style>