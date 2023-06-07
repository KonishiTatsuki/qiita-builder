<template>
  <div>
    <h1 class="title text-center">{{ adventName }}</h1>
    <h2 class="subtitle text-center">{{ description }}</h2>
    <div>作成者:{{ managerName }}</div>
    <div>{{ startDate }}</div>
    <div>{{ endDate }}</div>
    <!-- ここからカレンダーを表示する -->
    <div>
      <table class="bg-blue-50">
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day" class="bg-blue-100">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in calendarChunks" :key="index" class="p">
            <td v-for="day in week" :key="day.date" class="pt-2 pb-7 pl-7 pr-7">
              <div class="text-lg text-center mt-2 mb-5">
                {{
                  day.isCurrentMonth && day.date
                    ? dayjs(day.date).format("DD")
                    : ""
                }}
              </div>
              <div>
                <div
                  v-if="
                    (day.isCurrentMonth && day.period) ||
                    matchingArticles(day.date).length > 0
                  "
                >
                  <div
                    v-for="article in matchingArticles(day.date)"
                    :key="article.id"
                  >
                    <div class="text-center">{{ article.userId.username }}</div>
                    <NuxtLink
                      :to="`/articleDetail/${article.id}`"
                      :class="{ 'disabled-link': !isDatePast(day.date) }"
                    >
                      <div class="text-center">{{ article.title }}</div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div>
                <NuxtLink :to="`/advents/${id}/${day.date}`">
                  <button
                    v-if="
                      day.isCurrentMonth &&
                      day.period &&
                      matchingArticles(day.date).length === 0 &&
                      !isDatePast(day.date) &&
                      day.date !== dayjs().format('YYYY-MM-DD')
                    "
                    class="bg-blue-200 hover:bg-blue-400 text-black py-2 px-4 rounded"
                  >
                    参加する
                  </button>
                </NuxtLink>
              </div>
              <div>
                <NuxtLink :to="`/advents/edit/${id}/${day.date}`">
                  <button
                    v-if="
                      day.isCurrentMonth &&
                      day.period &&
                      matchingArticles(day.date).length === 1 &&
                      !isDatePast(day.date) &&
                      day.date !== dayjs().format('YYYY-MM-DD')
                    "
                    class="bg-green-200 hover:bg-green-400 text-black py-2 px-4 rounded"
                  >
                    編集する
                  </button>
                </NuxtLink>
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

const articleList = articleData.value;
console.log("articleList", articleList);
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

// カレンダーの日付にマッチする記事のフィルタリング
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
/* カレンダーのCSS */
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
}
.calendar th {
  border: 1px solid #ccc;
  padding: 0.5em;
  text-align: center;
}
.calendar td {
  border: 1px solid #ccc;
  padding: 1.5em;
  text-align: center;
}
.calendar td:hover {
  background-color: #eee;
}
.disabled-link {
  pointer-events: none;
  color: gray;
}
</style>
