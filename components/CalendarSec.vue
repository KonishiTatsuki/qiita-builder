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
              <div class="text-lg text-center mt-2 mb-5">{{ day.date }}</div>
              <button
                v-if="day.isCurrentMonth && day.period"
                @click="joinEvent(day)"
                class="bg-blue-200 hover:bg-blue-400 text-black py-2 px-4 rounded"
              >
                参加する
              </button>
              <div>
                <div v-if="day.isCurrentMonth && day.period">
                  <div v-for="post in day.postDate" :key="post.id">
                    <div class="text-center">{{ post.title }}</div>
                    <div class="text-center">{{ post.userId.username }}</div>
                  </div>
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
import { ref } from "vue";

// bannerデータを取得
const adventName = ref("");
const description = ref("");
const startDate = ref("");
const endDate = ref("");
const managerName = ref("");
const bannerId = ref("");
const { data } = await useFetch("/api/advent/get");
console.log(data.value[0]);
bannerId.value = data.value[0].id;
adventName.value = data.value[0].adventName;
description.value = data.value[0].description;
startDate.value = data.value[0].startDate;
endDate.value = data.value[0].endDate;
managerName.value = data.value[0].userId.username;

// ここからカレンダーの処理
// startDateとendDateをDate型に変換
const startD = new Date(startDate.value);
const endD = new Date(endDate.value);
console.log("startD：", startD);

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
  calendar.push({ date: i, isCurrentMonth: true });
}
// 月の最後の日の曜日まで空の配列を作成
for (let i = 0; i < 6 - lastDayOfWeek; i++) {
  calendar.push({ date: "", isCurrentMonth: false });
}
// startDからendD以外のオブジェクトにperiodのプロパティをfalseにして追加
for (let i = 0; i < calendar.length; i++) {
  const date = new Date(
    startD.getFullYear(),
    startD.getMonth(),
    calendar[i].date
  );
  if (date < startD - 1 || date > endD) {
    calendar[i].period = false;
  } else {
    calendar[i].period = true;
  }
}
console.log(calendar);

// 週ごとにカレンダーをチャンク分割する
const calendarChunks = computed(() => {
  const chunks = [];
  const chunkSize = 7;
  for (let i = 0; i < calendar.length; i += chunkSize) {
    chunks.push(calendar.slice(i, i + chunkSize));
  }
  return chunks;
});

// 曜日の配列
const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

// 参加するボタンのハンドラ
const router = useRouter();
const joinEvent = (day) => {
  // ルートパスに対して動的なパラメータを渡す場合は、`params`オプションを使用します
  router.push({
    path: "/postAdvent",
    params: {
      bannerId: bannerId.value,
      date: day.date,
      month: startD.getMonth() + 1,
      year: startD.getFullYear(),
    },
  });
  console.log("paramsのdateの値", day.date);
  console.log("paramsのbannerIdの値", bannerId.value);
  console.log("paramsのmonthの値", startD.getMonth() + 1);
  console.log("paramsのyearの値", startD.getFullYear());
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
  padding: 0.5em;
  text-align: center;
}
.calendar td:hover {
  background-color: #eee;
}
</style>
