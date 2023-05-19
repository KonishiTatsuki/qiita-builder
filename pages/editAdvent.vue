<template>
  <div>
    <h1 class="title">アドベントカレンダー編集</h1>
    <h2 class="subtitle">アドベントカレンダーの題名</h2>
    <input
      maxlength="30"
      type="text"
      name="title"
      class="border border-blue-500 w-96"
    />
    <h2 class="subtitle">アドベントカレンダーの説明</h2>
    <textarea
      name="body"
      cols="100"
      rows="7"
      maxlength="255"
      class="border border-blue-500"
    ></textarea>
    <h2 class="subtitle">期間</h2>
    <h2 class="subtitle">バナー画像</h2>
    <div>
      <input type="file" accept="image/*" />
    </div>
    <div class="flex justify-end">
      <button class="btn">編集完了</button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
