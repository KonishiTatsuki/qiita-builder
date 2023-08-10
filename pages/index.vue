<template>
  <div class="main">
    <div class="flex justify-center mb-0">
      <!-- カテゴリ検索欄 -->
      <div class="flex flex-col">
        <!-- コンポーネントのループ -->
        <component
          v-if="tagName && occupationName && clubName"
          v-for="component in components"
          :key="component.name"
          :is="component.name"
          :tagName="tagName"
          :visibleTagItems=10
          :showAllTagItems=false
          :occupationName="occupationName"
          :clubName="clubName"
          :visibleClubItems=10
          :showAllClubItems=false
          @languagecheckbox-change="changeLanguageCheckbox"
          @occupationcheckbox-change="changeOccupationCheckbox"
          @clubcheckbox-change="changeClubCheckbox"
        />
      </div>

      <div>
        <!-- アドベントカレンダーバナー -->
        <NuxtLink
          v-if="bannerData && bannerData[0]?.id"
          :to="{ path: `/calendar/${bannerData[0].id}` }"
        >
          <div
            class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 rounded-lg shadow-lg flex items-center justify-between mt-3 w-[1000px]"
            :style="
              'background-image: url(' +
              (bannerData && bannerData[0]?.image) +
              '); background-size: 1000px 350px;'
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
        <div class="flex justify-end w-[1000px]">
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
        <section class="text-gray-600 body-font overflow-hidden w-[1000px]">
          <div class="container px-5 pb-24 mx-auto">
            <div
              v-if="
                (!hasVisibleArticles && search) ||
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
                v-for="article in filteredArticles"
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
                  <div class="md:flex-grow mr-5 overflow-hidden">
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
                    <div
                      v-if="article.tags"
                      class="flex flex-wrap space-x-2 space-y-2 m-4"
                    >
                      <span
                        class="bg-blue-100 text-blue-600 px-2 py-1 rounded my-1"
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
                  </div>
                  <div>
                    <button
                      v-if="authority"
                      @click="(open = true), (deleteItem = article.id)"
                      class="btn h-[40px] w-[70px]"
                    >
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
    <!-- ページングコントロール -->
    <div class="flex justify-center my-5">
      <button
        :disabled="currentPage === 1"
        @click="goToFirstPage"
        class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-200 rounded-l-lg hover:bg-[#1D8EB9] hover:text-white focus:z-10 focus:ring-2 focus:ring-[#1D8EB9] focus:bg-[#1D8EB9] focus:text-white focus:border-[#1D8EB9] dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        先頭に戻る
      </button>
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-200 rounded-l-lg hover:bg-[#1D8EB9] hover:text-white focus:z-10 focus:ring-2 focus:ring-[#1D8EB9] focus:bg-[#1D8EB9] focus:text-white focus:border-[#1D8EB9] dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        前のページ
      </button>
      <span class="px-4 py-2 text-sm font-medium text-gray-900">
        ページ {{ currentPage }} /
        {{ Math.ceil(visibleArticleCount / itemsPerPage) }}
      </span>
      <button
        :disabled="currentPage * itemsPerPage >= visibleArticleCount"
        @click="currentPage++"
        class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-200 rounded-r-md hover:bg-[#1D8EB9] hover:text-white focus:z-10 focus:ring-2 focus:ring-[#1D8EB9] focus:bg-[#1D8EB9] focus:text-white focus:border-[#1D8EB9] dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        次のページ
      </button>
    </div>
  </div>
</template>


<script>
import { HeartIcon } from '@heroicons/vue/outline'
import LanguageList from '../components/LanguageList.vue'
import OccupationList from '../components/OccupationList.vue'
import ClubList from '../components/ClubList.vue'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

export default {
  components: {
    HeartIcon,
    LanguageList,
    OccupationList,
    ClubList
  },
  data() {
    return {
      articleData: [],
      bannerData: [],
      selectedOccupations: [],
      selectedClubs: [],
      selectedTags: [],
      currentPage: 1,
      itemsPerPage: 10,
      open: false,
      runtimeConfig: null,
      supabase: null,
      occupationName: [],
      clubName: [],
      tagName: [],
      tags : [],
      likeData: [],
      search :  '',
      date : new Date(), //現在の日付取得
      client: createClient(
        this.$config.public.supabase.url,
        this.$config.public.supabase.key
      ),
      authority: [],
      userId: null
    }
  },
  async created() {
    this.fetchData();
    this.fetchOccupation();
    this.fetchClubName();
    this.fetchTagName();
    this.fetchTags();
    this.fetchbannerData();
    await this.initializeUser();
    this.fetchAuthority();
    this.subscribe();
  },
  watch: {
    '$route'(to, from) {
      this.search = to.query.search;
      this.filterArticles(this.search);
    }
  },
  computed: {
    hasCheckedTags() {
      return this.tagName.some((tag) => {
        return tag.checked
      })
    },
    hasCheckedOccupations() {
      return this.occupationName.some((occupation) => {
        return occupation.checked
      })
    },
    hasCheckedClubs() {
      return this.clubName.some((club) => {
        return club.checked
      })
    },
    hasVisibleArticles() {
      return this.articleData.some((article) => {
        return (
          !article.hideByOccupation &&
          !article.hideByClub &&
          !article.hideByTag &&
          !article.hide
        )
      })
    },
    filteredArticles() {
      const filtered = this.articleData.filter((article) => {
        // フィルタリングの条件を追加する
        return (
          !article.hideByOccupation &&
          !article.hideByClub &&
          !article.hideByTag &&
          !article.hide
        );
      });
      // フィルタリングされた記事をページング用にスライスする
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return filtered.slice(startIndex, endIndex)
    },
    visibleArticleCount() {
      const filtered = this.articleData.filter((article) => {
        // フィルタリングの条件を追加する
        return (
          !article.hideByOccupation &&
          !article.hideByClub &&
          !article.hideByTag &&
          !article.hide
        )
      })
      return filtered.length
    },
    components() {
    let components = [
      {
        name: LanguageList,
        order: this.tagName.reduce((sum, tag) => sum + tag.count, 0),
      },
      {
        name: OccupationList,
        order: this.occupationName.reduce((sum, tag) => sum + tag.count, 0),
      },
      {
        name: ClubList,
        order: this.clubName.reduce((sum, tag) => sum + tag.count, 0),
      },
    ];
    components.sort((a, b) => b.order - a.order);
    return components;
    }
  },
  methods: {
    async fetchData() {
      let { data } = await this.client
        .from("article")
        .select("body, clubTagId, date, delete, id, occupationTagId, title, userId")
        .lte("publishDate", this.date.toISOString())
        .eq("delete", false)
        .order("date", { ascending: false });
      const userIds = data.map((article) => article.userId);
      const { data: users } = await this.client
        .from("profiles")
        .select("id, username,image")
        .in("id", userIds);
      const userMap = {};
      for (const user of users) {
        userMap[user.id] = { username: user.username, image: user.image };
      }

      this.articleData = data.map((article) => ({
        ...article,
        username: userMap[article.userId]?.username || "",
        image: userMap[article.userId]?.image || "",
      }));

      let { data: db } = await this.client.from("like").select("*");
      this.likeData = db;

      const likeTable = this.likeData.reduce((acc, like) => {
        const { articleId, userId } = like;
        if (!acc.hasOwnProperty(articleId)) {
          acc[articleId] = new Set();
        }
        acc[articleId].add(userId);
        return acc;
      }, {});

      this.articleData = await this.articleData.map((article) => ({
        ...article,
        like: likeTable[article.id] ? likeTable[article.id].size : 0,
        hideByOccupation: false,
        hideByClub: false,
        hideByTag: false,
        hide: false,
      }));

      let { data: tags } = await this.client.from("tagging").select("tagId,articleId");

      this.articleData.forEach((article) => {
        article.tags = [];
      });

      tags.forEach((tag) => {
        const articleId = tag.articleId;
        const article = this.articleData.find(
          (article) => article.id === articleId
        );
        if (article) {
          article.tags.push(tag.tagId);
        }
      });
      console.log(this.articleData);
    },
    initializeUser() {
      return new Promise((resolve, reject) => {
        this.client.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN') {
            this.userId = session.user.id;
          } else if (event === 'SIGNED_OUT') {
            this.userId = null;
          }
          resolve();  // Promise を解決する
        });
      });
    },
    subscribe(){
      this.client
        .channel("table-db-changes") // 任意のチャンネル名
        .on(
          "postgres_changes",
          {
            event: "*", // "INSERT" | "UPDATE" | "DELETE" のように特定イベントだけの購読も可能
            schema: "public",
            table: "article",
          },
          (payload) => {
            this.fetchData();
          }
        )
        .subscribe();
    },
    async fetchOccupation() {
      let { data: occupation } = await this.client
        .from("occupation")
        .select("*")
        .order("count", { ascending: false });
      this.occupationName = occupation;
      this.occupationName.forEach((occupation) => {
        occupation.checked = false;
      });
    },
    async fetchClubName() {
      let { data: club } = await this.client
        .from("club")
        .select("*")
        .eq("display", "true")
        .order("count", { ascending: false });
      this.clubName = club;
      this.clubName.forEach((club) => {
        club.checked = false;
      });
      console.log(this.clubName)
    },
    async fetchTagName() {
      let { data: name } = await this.client
        .from("tag")
        .select("*")
        .eq("display", "true")
        .order("count", { ascending: false });
      this.tagName = name;
      this.tagName.forEach((tag) => {
        tag.checked = false;
      });
      console.log(this.tagName)
    },
    async fetchTags() {
      let { data: t } = await this.client
        .from("tag")
        .select("id,name")
      this.tags = t;
      console.log(this.tags);
    },
    async fetchbannerData() {
      let { data: banner } = await this.client
        .from("banner")
        .select("*")
        .eq("display", "true");
      this.bannerData = banner;
    },
    //管理者権限があるか確認
    async fetchAuthority() {
      try {
        let response = await axios.post("/api/user/getAdminUser", this.userId, {
          headers: {
            'Content-Type': 'text/plain'
          }
        });
        this.authority = response.data[0].authority;
        console.log(this.authority)
      } catch (error) {
        console.error(error);
      };
    },
    filterArticles(searchParam) {
      // 全ての記事を表示する場合はフィルタリングをスキップ
      if (!searchParam) {
        this.articleData.forEach((article) => (article.hide = false));
        return;
      }

      // 検索クエリを小文字に変換して、記事のタイトルや本文と照合する
      const query = searchParam.toLowerCase();

      this.articleData.forEach((article) => {
        const titleMatch = article.title.toLowerCase().includes(query);
        const bodyMatch = article.body.toLowerCase().includes(query);
        article.hide = !(titleMatch || bodyMatch);
      });
      this.goToFirstPage();
    },
    async filterArticlesByOccupation(occupationData) {
      this.selectedOccupations = this.occupationName
        .filter((occupation) => occupation.checked)
        .map((occupation) => occupation.id)

      this.articleData.forEach((article) => {
        if (this.selectedOccupations.length === 0) {
          article.hideByOccupation = false
        } else {
          article.hideByOccupation = !this.selectedOccupations.includes(article.occupationTagId)
        }
      })
      this.goToFirstPage()

      if (occupationData.checked) {
        try {
         await axios.post("/api/occupation/increaseCount", occupationData, {
          headers: {
            'Content-Type': 'text/plain'
          }
        });
        } catch (error) {
          console.error(error);
        };
      }
    },

    async filterArticlesByClub(clubData) {
      this.selectedClubs = this.clubName
        .filter((club) => club.checked)
        .map((club) => club.id)

      this.articleData.forEach((article) => {
        if (this.selectedClubs.length === 0) {
          article.hideByClub = false
        } else {
          article.hideByClub = !this.selectedClubs.includes(article.clubTagId)
        }
      })
      this.goToFirstPage()

      if (clubData.checked) {
        try {
         await axios.post("/api/occupation/increaseCount", clubData, {
          headers: {
            'Content-Type': 'text/plain'
          }
        });
        } catch (error) {
          console.error(error);
        };
      }
    },

    async filterArticlesByTag(tag) {
      this.selectedTags = this.tagName
        .filter((tag) => tag.checked)
        .map((tag) => tag.id)

      this.articleData.forEach((article) => {
        if (this.selectedTags.length === 0) {
          article.hideByTag = false
        } else {
          article.hideByTag = !article.tags.some((tag) => this.selectedTags.includes(tag))
        }
      })
      this.goToFirstPage()

      if (tag.checked) {
        try {
         await axios.post("/api/occupation/increaseCount", tag, {
          headers: {
            'Content-Type': 'text/plain'
          }
        });
        } catch (error) {
          console.error(error);
        };
      }
    },

    // 職種の名称表示
    getOccupationName(occupationTagId) {
      const occupation = this.occupationName.find(
        (item) => item.id === occupationTagId
      )
      return occupation ? occupation.occupationName : ''
    },
    // タグの名称表示
    getTagsName(tagId) {
      const tag = this.tags.find((item) => item.id === tagId)
      return tag ? tag.name : ''
    },
    // サークルの名称表示
    getClubsName(clubTagId) {
      const club = this.clubName.find((item) => item.id === clubTagId)
      return club ? club.clubName : ''
    },

    // 記事データを投稿日順にソートする
    sortArticlesByDate() {
      this.articleData.sort((a, b) => new Date(a.date) - new Date(b.date));
      this.goToFirstPage();
    },
    // 記事データを新着順にソートする
    sortArticlesByDateDescending() {
      this.articleData.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.goToFirstPage();
    },
    // 記事データをいいね数の降順にソートする
    sortByLikes() {
      this.articleData.sort((a, b) => b.like - a.like);
      this.goToFirstPage();
    },

    changeLanguageCheckbox(tagName, tag) {
      this.tagName = tagName
      this.filterArticlesByTag(tag)
    },

    changeOccupationCheckbox(occupationName, occupation) {
      this.occupationName = occupationName
      this.filterArticlesByOccupation(occupation)
    },

    changeClubCheckbox(clubName, club) {
      this.clubName = clubName
      this.filterArticlesByClub(club)
    },

    async deleteArticle(id) {
      await this.client.from('article').update({ delete: true }).eq('id', id)
      this.open = false
    },
    goToFirstPage() {
      this.currentPage = 1;
    },
     //日時のスタイル変更
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
        return new Date(date).toLocaleDateString('ja-JP', options)
    },
  },
}
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

.scale-75 {
  transform: scale(0.75);
  transform-origin: top;
}
</style>
