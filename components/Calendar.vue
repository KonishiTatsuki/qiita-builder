<template>
  <div class="content">
    <div>
      <h1 class="title">アドベントカレンダーの名前</h1>
      <h2 class="subtitle">説明文。。。。。。。。。。</h2>
    </div>
    <h2 class="subtitle">カレンダー{{ displayMonth }}</h2>
    <p>管理者名</p>
    <div class="button-area">
      <button @click="prevMonth" class="button">前の月</button>
      <button @click="nextMonth" class="button">次の月</button>
    </div>
    <div class="calendar">
      <div class="calendar-weekly">
        <div class="calendar-youbi" v-for="n in 7" :key="n">
          {{ youbi(n - 1) }}
        </div>
      </div>
      <div
        class="calendar-weekly"
        v-for="(week, index) in calendars"
        :key="index"
      >
        <div
          class="calendar-daily"
          :class="{
            outside: day.month !== currentMonth,
          }"
          v-for="(day, index) in week"
          :key="index"
        >
          <div class="calendar-day">
            {{ day.date }}
          </div>
          <div>
            <NuxtLink to="/postAdvent">
              <button
                class="button-entry"
                @click="handleJoinButton(day.postDate)"
              >
                参加する
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
export default {
  setup() {
    const router = useRouter();
    const currentDate = reactive(moment());
    const getStartDate = () => {
      let date = moment(currentDate);
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    };
    const getEndDate = () => {
      let date = moment(currentDate);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    };
    const getCalendar = () => {
      let startDate = getStartDate();
      const endDate = getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
      let calendars = [];
      let calendarDate = getStartDate();
      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            date: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
            postDate: calendarDate.format("YYYY-MM-DD"),
          });
          calendarDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    };
    const nextMonth = () => {
      currentDate.add(1, "month");
    };
    const prevMonth = () => {
      currentDate.subtract(1, "month");
    };
    const youbi = (dayIndex) => {
      const week = ["日", "月", "火", "水", "木", "金", "土"];
      return week[dayIndex];
    };
    const displayMonth = computed(() => {
      return currentDate.format("YYYY[年]M[月]");
    });
    const currentMonth = computed(() => {
      return currentDate.format("YYYY-MM");
    });
    const handleJoinButton = (postDate) => {
      console.log("ボタンデータ", postDate);
      router.push({
        path: "/postAdvent",
        query: { date: postDate },
      });
    };

    return {
      currentDate,
      calendars: computed(getCalendar),
      displayMonth,
      currentMonth,
      prevMonth,
      nextMonth,
      youbi,
      handleJoinButton,
    };
  },
};
</script>
<style>
.content {
  margin: 2em auto;
  width: 900px;
}
.button-area {
  margin: 0.5em 0;
}
.button {
  padding: 4px 8px;
  margin-right: 8px;
}
.button-entry {
  padding: 4px 8px;
  background-color: #4c61ae6b;
  margin-top: 1rem;
  margin-bottom: auto;
  border-radius: 10px;
}
.button:hover {
  cursor: pointer;
  font-weight: bold;
}
.button-entry:hover {
  cursor: pointer;
  font-weight: bold;
}
.calendar {
  max-width: 900px;
  border-top: 1px solid #4c61ae;
  font-size: 0.8em;
}
.calendar-weekly {
  display: flex;
  border-left: 1px solid #4c61ae;
  /* background-color: black; */
}
.calendar-daily {
  flex: 1;
  min-height: 125px;
  border-right: 1px solid #4c61ae;
  border-bottom: 1px solid #4c61ae;
  margin-right: -1px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.calendar-day {
  /* 日付 */
  text-align: center;
}
.calendar-youbi {
  flex: 1;
  border-right: 1px solid #4c61ae;
  margin-right: -1px;
  text-align: center;
}
.outside {
  background-color: #d4d2d2;
}
</style>
