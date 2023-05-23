<template>
  <div class="content">
    <h2>カレンダー{{ displayMonth }}</h2>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      currentDate: moment(),
    };
  },
  computed: {
    calendars() {
      return this.getCalendar();
    },
    displayMonth() {
      return this.currentDate.format("YYYY[年]M[月]");
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM");
    },
  },

  methods: {
    getStartDate() {
      let date = moment(this.currentDate);
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    },
    getEndDate() {
      let date = moment(this.currentDate);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    },
    getCalendar() {
      let startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);
      let calendars = [];
      let calendarDate = this.getStartDate();
      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            date: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
          });
          calendarDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month");
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
    },
    youbi(dayIndex) {
      const week = ["日", "月", "火", "水", "木", "金", "土"];
      return week[dayIndex];
    },
  },
  mounted() {
    console.log(this.getCalendar());
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
}
.calendar-day {
  /* 日付 */
  text-align: center;
  background-color: white;
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
