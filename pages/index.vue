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
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                  v-model="tag.checked"
                  @change="filterArticlesByTag"
                />
                <label
                  :for="'tag-checkbox-' + index"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
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
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                  v-model="occupation.checked"
                  @change="filterArticlesByOccupation"
                />
                <label
                  :for="'occupation-checkbox-' + index"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
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
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                  v-model="club.checked"
                  @change="filterArticlesByClub"
                />
                <label
                  :for="'club-checkbox-' + index"
                  class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
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

      <div class="w-full">
        <!-- アドベントカレンダーバナー -->
        <NuxtLink
          v-if="bannerData && bannerData[0]?.id"
          :to="{ path: `/calendar/${bannerData[0].id}` }"
        >
          <div
            class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg shadow-lg flex items-center justify-between mt-3"
            :style="
              'background-image: url(' +
              (bannerData && bannerData[0]?.image) +
              '); background-size: 1200px 350px;'
            "
          >
            <!-- メッセージ -->
            <div class="text-white font-bold title">
              <p class="ml-5">Qiita Builder Advent Calendar</p>
              <p class="ml-5">開催中</p>
            </div>
          </div>
        </NuxtLink>
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
            <div
              v-if="
                (!hasVisibleArticles &&
                  route.currentRoute.value.query.search) ||
                (!hasVisibleArticles && hasCheckedTags) ||
                (!hasVisibleArticles && hasCheckedOccupations) ||
                (!hasVisibleArticles && hasCheckedClubs)
              "
              class="text-center text-gray-500 py-8"
            >
              申し訳ございません。記事が見つかりませんでした。
            </div>
            <div class="-my-8 divide-y-2 divide-gray-100">
              <div
                class="flex flex-wrap md:flex-nowrap rounded-lg px-6 pt-6 pb-3 m-8 shadow-md relative"
                v-for="article in articleData"
                :key="article.id"
                v-show="
                  !article.hideByOccupation &&
                  !article.hideByClub &&
                  !article.hideByTag &&
                  !article.hide
                "
              >
                <div class="flex w-full">
                  <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <div class="flex items-center">
                      <!-- アイコン -->
                      <img
                        v-if="article.image"
                        :src="article.image"
                        alt="Icon"
                        class="w-8 h-8 rounded-full mr-2"
                      />
                      <span
                        class="font-semibold title-font text-gray-700 mr-1 tooltip"
                        >{{ article.username }}&nbsp;（{{
                          getOccupationName(article.occupationTagId)
                        }}）</span
                      >
                    </div>
                    <div v-if="article.clubTagId" class="mt-1">
                      <span class="text-gray-500">
                        {{ getClubsName(article.clubTagId) }}
                      </span>
                    </div>

                    <div class="flex mt-1">
                      <HeartIcon class="h-6 w-6" />
                      <span class="font-semibold title-font text-gray-700 ml-1">
                        {{ article.like }}
                      </span>
                    </div>
                  </div>
                  <div class="md:flex-grow">
                    <router-link
                      :to="`/articleDetail/${article.id}`"
                      class="hover:underline"
                    >
                      <h2
                        class="text-4xl font-medium text-gray-900 title-font mb-2"
                      >
                        {{
                          article.title.length > 30
                            ? article.title.slice(0, 30) + "..."
                            : article.title
                        }}
                      </h2>
                    </router-link>
                    <router-link
                      :to="`/articleDetail/${article.id}`"
                      class="hover:underline"
                    >
                      <p class="leading-relaxed" id="custom-prose">
                        {{
                          article.body.length > 100
                            ? article.body.slice(0, 100) + "..."
                            : article.body
                        }}
                      </p>
                    </router-link>
                    <div v-if="article.tags" class="flex space-x-2 m-4">
                      <span
                        class="bg-blue-100 text-blue-600 px-2 py-1 rounded"
                        v-for="tag in article.tags"
                        :key="tag"
                        >{{ getTagsName(tag) }}</span
                      >
                    </div>
                    <div
                      class="text-gray-500 text-sm absolute bottom-1 right-3"
                    >
                      投稿日：{{ formatDate(article.date) }}
                    </div>
                    <div class="mt-4" v-if="authority"></div>
                  </div>
                  <div>
                    <!-- <button
                      class="btn block h-[40px]"
                      @click="deleteArticle(article.id)"
                    >
                      削除
                    </button> -->

                    <button @click="open = true , deleteItem = article.id" class="btn block h-[40px]">
                      削除
                    </button>
                    <Teleport to="body">
                      <div v-if="open" class="modal">
                        <div class="modal-content">
                          <p class="mb-5">本当に削除しますか？</p>
                          <button @click="open = false" class="btn mr-5">
                            No
                          </button>
                          <button
                            class="btn"
                            @click="deleteArticle(deleteItem)"
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </Teleport>
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

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { HeartIcon } from "@heroicons/vue/outline";

useHead({
  title: "記事一覧",
});

const route = useRouter();
const supabase = useSupabaseClient();
const userss = useSupabaseUser();
const userId = userss.value?.id;
let date = new Date(); //現在の日付取得
//モーダルの表示非表示
const open = ref(false);
const deleteItem = ref();


//管理者権限があるか確認
let { data: auth } = await useFetch("/api/user/getAdminUser", {
  method: "POST",
  body: userId,
});
const authority = auth.value[0].authority;

let tagName = ref([]);
let visibleTagItems = ref(10);
let showAllTagItems = ref(false);
let articleData = ref([]);
let likeData = ref([]);
let occupationName = ref([]);
let clubName = ref([]);
let visibleClubItems = ref(10);
let showAllClubItems = ref(false);
let bannerData = ref([]);
let tags = ref([]);
// let perPage = 3; // 1ページに表示する記事の数
// let currentPage = ref(1); // 現在のページ
// const open = ref(false);

(async () => {
  let { data } = await supabase
    .from("article")
    .select("body, clubTagId, date, delete, id, occupationTagId, title, userId")
    .lte("publishDate", date.toISOString())
    .eq("delete", false)
    .order("date", { ascending: false });

  // userIdを取得してユーザ名を取得する連想配列を作成
  const userIds = data
    // .filter((article) => article.userId !== null) // nullを除外
    .map((article) => article.userId);
  const { data: users } = await supabase
    .from("profiles")
    .select("id, username,image")
    .in("id", userIds);

  const userMap = {};
  for (const user of users) {
    userMap[user.id] = { username: user.username, image: user.image };
  }

  // data配列にusernameとimageを追加
  articleData.value = data.map((article) => ({
    ...article,
    username: userMap[article.userId]?.username || "",
    image: userMap[article.userId]?.image || "",
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
    hide: false,
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
})();

// Supabaseからtagテーブルデータ（display：trueのみ）を取得
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
})();

// Supabaseからtagテーブルデータ（全て）を取得
(async function () {
  let { data: t } = await supabase.from("tag").select("id,name");
  tags.value = t;
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

// Supabaseからbannerテーブルデータを取得
(async function () {
  let { data: banner } = await supabase
    .from("banner")
    .select("*")
    .eq("display", "true");
  bannerData.value = banner;
})();

// データフィルタリング用のメソッド
const filterArticles = (searchParam) => {
  // 全ての記事を表示する場合はフィルタリングをスキップ
  if (!searchParam) {
    articleData.value.forEach((article) => (article.hide = false));
    return;
  }

  // 検索クエリを小文字に変換して、記事のタイトルや本文と照合する
  const query = searchParam.toLowerCase();

  articleData.value.forEach((article) => {
    const titleMatch = article.title.toLowerCase().includes(query);
    const bodyMatch = article.body.toLowerCase().includes(query);
    article.hide = !(titleMatch || bodyMatch);
  });
};

// クエリパラメータが変更される毎にfilterArticles関数が行われる
watchEffect(() => {
  const searchParam = route.currentRoute.value.query.search;
  filterArticles(searchParam);
});

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
      article.hideByTag = !article.tags.some((tag) =>
        selectedTags.includes(tag)
      );
    }
  });
};

// プログラミング言語のフィルターがcheckされたか判定する
const hasCheckedTags = computed(() => {
  return tagName.value.some((tag) => {
    return tag.checked;
  });
});

// 職種のフィルターがcheckされたか判定する
const hasCheckedOccupations = computed(() => {
  return occupationName.value.some((occupation) => {
    return occupation.checked;
  });
});

// サークルのフィルターがcheckされたか判定する
const hasCheckedClubs = computed(() => {
  return clubName.value.some((club) => {
    return club.checked;
  });
});

// 記事があるかどうかを判定する
const hasVisibleArticles = computed(() => {
  return articleData.value.some((article) => {
    return (
      !article.hideByOccupation &&
      !article.hideByClub &&
      !article.hideByTag &&
      !article.hide
    );
  });
});

// const pageCount = computed(() => {
//   return Math.ceil(articleData.value.length / perPage); // ページ数の計算
// });

// const visibleArticleData = computed(() => {
//   const startIndex = (currentPage.value - 1) * perPage; // 表示する記事の開始インデックス
//   const endIndex = startIndex + perPage; // 表示する記事の終了インデックス
//   return articleData.value.slice(startIndex, endIndex); // 表示する記事データの抽出
// });

// プログラミング言語の表示数を変更する
const toggleShowAllTagItems = () => {
  if (showAllTagItems.value) {
    visibleTagItems.value = 10;
    showAllTagItems.value = false;
  } else {
    visibleTagItems.value = tagName.value.length;
    showAllTagItems.value = true;
  }
};

// サークルの表示数を変更する
const toggleShowAllClubItems = () => {
  console.log(visibleArticleData.value);
  if (showAllClubItems.value) {
    visibleClubItems.value = 10;
    showAllClubItems.value = false;
  } else {
    visibleClubItems.value = clubName.value.length;
    showAllClubItems.value = true;
  }
};

// 職種の名称表示
function getOccupationName(occupationTagId) {
  const occupation = occupationName.value.find(
    (item) => item.id === occupationTagId
  );
  return occupation ? occupation.occupationName : "";
}

// タグの名称表示
function getTagsName(tagId) {
  const tag = tags.value.find((item) => item.id === tagId);
  return tag ? tag.name : "";
}

// サークルの名称表示
function getClubsName(clubTagId) {
  const club = clubName.value.find((item) => item.id === clubTagId);
  return club ? club.clubName : "";
}

//日時のスタイル変更
const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("ja-JP", options);
};

// 管理者による記事削除
const router = useRouter();
const deleteArticle = async (id) => {
  await supabase.from("article").update({ delete: true }).eq("id", id);
  open.value = false;
  location.reload();
};
</script>

<style>
#custom-prose * {
  all: revert;
}

/* モーダルCSS */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* background-color: #959393; */
  background-color: rgba(149, 147, 147, 0.3);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 40px;
  border: 1px solid #888;
  width: 300px;
  text-align: center;
}
</style>
