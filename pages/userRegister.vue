<template>
  <FormKit
    type="form"
    @submit="submitHandler"
    submit-label="登録する"
    #default="{ value }"
  >
    <div class="h-1/5">
      <div>
        <div>
          <div>
            <h1 class="title">新規登録</h1>
            <div class="mb-2">
              <div>
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                  }"
                  type="text"
                  label=" ユーザ名"
                  name="username"
                  validation="required|length:0,30|matches:/"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'ユーザ名を入力してください',
                    length: '30文字以内で入力してください',
                  }"
                />
              </div>
            </div>
            <div class="mb-2">
              <div>
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                  }"
                  type="email"
                  label=" メールアドレス"
                  name="email"
                  validation="required|matches:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/|ends_with:rakus-partners.co.jp"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'メールアドレスを入力してください',
                    matches: '正しいメールアドレスを入力してください',
                    ends_with: 'ラクスのメールアドレスを入力してください',
                  }"
                />
              </div>
            </div>
            <div class="mb-2">
              <div>
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                  }"
                  type="password"
                  label=" パスワード"
                  name="password"
                  validation="required|length:8,30|contains_numeric|contains_lowercase|contains_uppercase"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'パスワードを入力してください',
                    length: '8文字以上30文字以内で入力してください',
                    contains_numeric:
                      '半角英小文字・大文字・数字をそれぞれ1種類以上含んでください',
                    contains_lowercase:
                      '半角英小文字・大文字・数字をそれぞれ1種類以上含んでください',
                    contains_uppercase:
                      '半角英小文字・大文字・数字をそれぞれ1種類以上含んでください',
                  }"
                />
              </div>
            </div>
            <div class="mb-2">
              <div>
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                  }"
                  type="password"
                  label=" パスワード確認用"
                  name="password_confirm"
                  validation="required|confirm"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'パスワードを入力してください',
                    confirm: 'パスワードが一致しません',
                  }"
                />
              </div>
            </div>
          </div>
          <div class="mb-2">
            <FormKit
              :classes="{
                input: 'border border-black py-1 px-2 rounded-md',
              }"
              type="select"
              label="サークル名"
              name="club"
              placeholder="Choose a food"
              validation="required"
              :options="['Pizza', 'Ice Cream', 'Burger']"
            />
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
        <!-- <button class="btn">登録する</button> -->
      </div>
    </div>

    <pre wrap>{{ value }}</pre>
  </FormKit>
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
const submitHandler = (credentials) => {
  console.log(credentials);
};
</script>
