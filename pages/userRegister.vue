<template>
  <div class="h-1/5">
    <div>
      <div>
        <div>
          <h1 class="title">新規登録</h1>
          <div class="mb-2">
            ユーザ名
            <div>
              <input type="text" class="border border-black" maxlength="30" />
            </div>
          </div>
          <div class="mb-2">
            メールアドレス
            <div>
              <input type="text" class="border border-black" maxlength="255" />
            </div>
          </div>
          <div class="mb-2">
            パスワード
            <div>
              <input
                type="password"
                class="border border-black"
                maxlength="30"
              />
            </div>
          </div>
          <div class="mb-2">
            パスワード確認用
            <div>
              <input
                type="password"
                class="border border-black"
                maxlength="30"
              />
            </div>
          </div>
        </div>
        <div class="mb-2">
          サークル名
          <div>
            <select name="" id="">
              <option value="">その他</option>
              <input type="text" class="border border-black" />
            </select>
          </div>
        </div>
        <div class="mb-2">
          職種
          <div class="flex">
            <button
              type="button"
              class="rounded-xl border border-black w-11 m-1"
              v-for="item in occupation"
            >
              {{ item }}
            </button>
          </div>
        </div>
        <div class="mb-2">
          アイコン画像
          <div>
            <input type="file" accept="image/*" />
          </div>
        </div>
        <div>
          自己紹介
          <div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              class="border border-black"
              maxlength="255"
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>

    <div class="flex mb-4">
      <button class="btn mr-3">登録してQiitaへ進む</button>
      <button class="btn">登録する</button>
    </div>
  </div>
</template>

<script setup>
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
