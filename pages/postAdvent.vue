<template>
  <div>
    <h1 class="title">アドベントカレンダーに投稿</h1>
    <p class="text-red-500">※投稿や編集、削除ができるのは期間までです。</p>
    <h2 class="subtitle">題名</h2>
    <input
      maxlength="30"
      type="text"
      name="title"
      class="border border-blue-500 w-96"
    />
    <h2 class="subtitle">記事の選択</h2>

    <div class="mb-2">
      <select name="" id="">
        <option value="">記事１</option>
      </select>
    </div>
    <div class="flex justify-end">
      <div>
        <button class="btn m-3 block">投稿</button>
        <button class="btn m-3 block">編集</button>
        <button class="btn m-3 block">削除</button>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
