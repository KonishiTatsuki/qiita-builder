<template>
  <div class="">
    <div
      class="rounded-lg shadow-lg flex items-center mt-3 min-w-full text-center bg-clip-padding banner-image"
      :style="
        'background-image: url(' +
        (bannerData && bannerData[0]?.image) +
        '); background-size: cover; background-position: center;'
      "
    >
      <div class="mx-auto">
        <h1 class="text-4xl text-center mt-8">{{ adventName }}</h1>
        <h2 class="text-xl text-center mt-4">{{ description }}</h2>
      </div>
    </div>
    <div class="mt-16">作成者:{{ managerName }}</div>
    <div class="mt-2">アドベント期間</div>
    <div class="mb-3">{{ startDate }} ~ {{ endDate }}</div>
    <!-- ここからカレンダーを表示する -->
    <div>
      <table class="bg-blue-50 min-w-full">
        <thead>
          <tr class="flex">
            <th
              v-for="day in daysOfWeek"
              :key="day"
              class="bg-blue-100 p-2 w-50"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(week, index) in calendarChunks"
            :key="index"
            class="h-30 flex"
          >
            <td
              v-for="day in week"
              :key="day.date"
              class="w-50"
              :class="{ 'bg-gray-200': !day.period || !day.isCurrentMonth }"
            >
              <div class="text-center pb-6">
                <div
                  class="text-sm text-center mb-5 h-5 border-b border-indigo-500"
                >
                  {{
                    day.isCurrentMonth && day.date
                      ? dayjs(day.date).format("DD")
                      : ""
                  }}
                </div>
                <div class="h-28 w-20 text-center basis-4/6 inline-block">
                  <div
                    v-if="
                      (day.isCurrentMonth && day.period) ||
                      matchingArticles(day.date).length > 0
                    "
                  >
                    <div
                      v-for="article in matchingArticles(day.date)"
                      :key="article.id"
                      class="max-w-xs max-h-min items-center"
                    >
                      <div class="justify-center">
                        {{ article.userId.username.slice(0, 10) }}
                      </div>
                      <NuxtLink
                        :to="`/articleDetail/${article.id}`"
                        :class="{ 'disabled-link': !isDatePast(day.date) }"
                        class="text-center"
                      >
                        <div class="text-center">
                          {{ article.title.slice(0, 10) }}
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                <div class="flex justify-center basis-1/6">
                  <NuxtLink :to="`/advents/${id}/${day.date}`">
                    <button
                      v-if="
                        day.isCurrentMonth &&
                        day.period &&
                        matchingArticles(day.date).length === 0 &&
                        !isDatePast(day.date) &&
                        day.date !== dayjs().format('YYYY-MM-DD')
                      "
                      class="flex-grow bg-blue-200 hover:bg-blue-400 text-black py-2 px-4 rounded"
                    >
                      参加
                    </button>
                  </NuxtLink>
                </div>
                <div class="flex justify-center basis-1/6">
                  <NuxtLink :to="`/advents/edit/${id}/${day.date}`">
                    <button
                      v-if="
                        day.isCurrentMonth &&
                        day.period &&
                        matchingArticles(day.date).length === 1 &&
                        !isDatePast(day.date) &&
                        day.date !== dayjs().format('YYYY-MM-DD') &&
                        matchingUser().some(
                          (article) =>
                            article.id === matchingArticles(day.date)[0].id
                        )
                      "
                      class="flex-grow bg-green-200 hover:bg-green-400 text-black py-2 px-4 rounded"
                    >
                      編集
                    </button>
                  </NuxtLink>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";

useHead({
  title: "アドベントカレンダー",
});

// bannerデータを取得
const adventName = ref("");
const description = ref("");
const startDate = ref("");
const endDate = ref("");
const managerName = ref("");
const route = useRoute();

const user = useSupabaseUser();
const userId = ref(user.value.id);
console.log("user", user.value.id);

// bannerテーブル情報を取得
const { id } = route.params;
const { data: bannerData } = await useFetch(`/api/advent/get?id=${id}`);
const { data: articleData } = await useFetch(
  `/api/advent/articleGet?bannerId=${id}`
);
console.log("articleData", articleData);
console.log("bannerData", bannerData);
adventName.value = bannerData.value[0].adventName;
description.value = bannerData.value[0].description;
startDate.value = bannerData.value[0].startDate;
endDate.value = bannerData.value[0].endDate;
managerName.value = bannerData.value[0].userId.username;
const bannerImage = ref(bannerData.value[0].image);
const articleList = articleData.value;

const matchingUser = () => {
  const userArticle = articleList.filter(
    (article) => article.userId.id === user.value.id
  );
  return userArticle;
};
console.log("matchingUser", matchingUser());

// ここからカレンダーの処理
// 曜日の配列
const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
// 週ごとにカレンダーをチャンク分割する
const calendarChunks = computed(() => {
  // startDateとendDateをDate型に変換
  const startD = new Date(startDate.value);
  const endD = new Date(endDate.value);

  // startDをもとにカレンダーの配列を作成
  const calendar = [];
  // 月の最初の日を取得
  const firstDay = new Date(startD.getFullYear(), startD.getMonth(), 1);

  // 月の最後の日を取得
  const lastDay = new Date(startD.getFullYear(), startD.getMonth() + 1, 0);

  // 月の最初の日の曜日を取得
  const firstDayOfWeek = firstDay.getDay();
  // 月の最後の日の曜日を取得
  const lastDayOfWeek = lastDay.getDay();
  // 月の最初の日の日付を取得
  const firstDate = firstDay.getDate();

  // 月の最後の日の日付を取得
  const lastDate = lastDay.getDate();

  // 月の最初の日の曜日まで空の配列を作成
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendar.push({ date: "", isCurrentMonth: false });
  }
  // 月の日付を配列に追加
  for (let i = firstDate; i <= lastDate; i++) {
    const year = startD.getFullYear();
    const month = String(startD.getMonth() + 1).padStart(2, "0");
    const day = String(i).padStart(2, "0");
    const currentDate = `${year}-${month}-${day}`;
    calendar.push({ date: currentDate, isCurrentMonth: true });
  }
  // 月の最後の日の曜日まで空の配列を作成
  for (let i = 0; i < 6 - lastDayOfWeek; i++) {
    calendar.push({ date: "", isCurrentMonth: false });
  }
  // startDからendD以外のオブジェクトにperiodのプロパティをfalseにして追加
  for (let i = 0; i < calendar.length; i++) {
    const date = new Date(calendar[i].date);
    if (date < startD || date > endD) {
      calendar[i].period = false;
    } else {
      calendar[i].period = true;
    }
  }
  const chunks = [];
  const chunkSize = 7;
  for (let i = 0; i < calendar.length; i += chunkSize) {
    chunks.push(calendar.slice(i, i + chunkSize));
  }
  return chunks;
});
console.log("calendarChunks", calendarChunks.value);

const isDateBetween = (date, startDate, endDate) => {
  const articleDate = new Date(date);
  const startD = new Date(startDate);
  const endD = new Date(endDate);

  return articleDate >= startD && articleDate <= endD;
};

// カレンダーの日付にマッチする記事のフィルタリング;
const matchingArticles = (date) => {
  return articleList.filter((article) => {
    const articleDate = dayjs(article.publishDate).format("YYYY-MM-DD");
    return (
      date === articleDate &&
      isDateBetween(articleDate, startDate.value, endDate.value)
    );
  });
};

// カレンダーの日付が現在の日付より前かどうかを判定
const isDatePast = (date) => {
  const todayDate = dayjs().startOf("day");
  const calendarDate = dayjs(date);
  return (
    calendarDate.isBefore(todayDate, "day") ||
    calendarDate.isSame(todayDate, "day")
  );
};
</script>

<style scoped>
.disabled-link {
  pointer-events: none;
  color: gray;
}
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  background-image: url(""); /* 初期値として空のURLを設定 */
}
</style>
