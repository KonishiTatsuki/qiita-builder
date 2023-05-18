<template>
  <div class="flex border border-black mt-3">
    <div class="m-3 p-3">
      <h1 class="title">ユーザ情報</h1>
      <div class="flex">
        ユーザー名:
        <p>やっぴー</p>
        <input
          type="text"
          class="border-black border"
          v-if="edit"
          maxlength="255"
        />
      </div>
      <div class="flex">
        メールアドレス：
        <p>yappi@rakus.co.jp</p>
        <input
          type="text"
          class="border-black border"
          v-if="edit"
          maxlength="255"
        />
      </div>
      <div class="flex">
        職種:
        <p>FR</p>
        <button
          type="button"
          class="rounded-xl border border-black w-11"
          v-for="item in occupation"
          v-if="edit"
        >
          {{ item }}
        </button>
      </div>
      <div class="flex">
        サークル名:
        <p>サウナ</p>
        <div v-if="edit">
          <select name="" id="">
            <option value="">その他</option>
            <input type="text" class="border border-black" />
          </select>
        </div>
      </div>
      <div>
        自己紹介:
        <p>こんにちは</p>
        <textarea
          v-if="edit"
          name=""
          id=""
          cols="30"
          rows="5"
          class="border border-black"
        ></textarea>
      </div>
    </div>
    <div><button class="btn mt-44">編集する</button></div>
  </div>

  <div class="flex border border-black mt-3">
    パスワード:
    <p>******</p>
    <input type="text" maxlength="30" />
    <button class="btn">パスワードを変更する</button>
  </div>
</template>

<script setup>
const edit = false;
const occupation = [
  "JAVA",
  "CL",
  "PHP",
  "FR",
  "ML",
  "QA",
  "営業",
  "内勤",
  "CS",
];
</script>
