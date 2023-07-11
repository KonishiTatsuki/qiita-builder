<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">パスワード再設定</h1>
          <div class="flex justify-center">
            <FormKit
              type="form"
              @submit="submit"
              :actions="false"
              incomplete-message=" "
            >
              <div class="mb-5 text-center">
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                    message: 'text-red-500',
                  }"
                  type="password"
                  label="新パスワード"
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
              <div class="mb-5 text-center">
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                    message: 'text-red-500',
                  }"
                  type="password"
                  label=" パスワード確認用"
                  name="password_confirm"
                  validation="required|confirm"
                  autocomplete="off"
                  :validation-messages="{
                    required: '確認用パスワードを入力してください',
                    confirm: 'パスワードが一致しません',
                  }"
                />
              </div>
              <div class="flex mb-4 justify-center">
                <button class="btn">登録</button>
              </div>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "vue-router";
import { useHead } from "unhead";

useHead({
  title: "パスワード再設定",
});

const router = useRouter();
// const client = useSupabaseClient();
const client = ref(
  createClient(
    "https://niezwnppucjwhxwfaxyr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZXp3bnBwdWNqd2h4d2ZheHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3MjkzNDAsImV4cCI6MjAwMDMwNTM0MH0.04tShAmtbz0zXhsyNQYo2fhcO2Tx0aQdI67Cg2f3BTo"
  )
);

//useSupabaseUserのテスト方法がわからない為、仮の値を取得
// const users = useSupabaseUser();
const users = ref({ id: "sdafdsvoias" });

const email = ref("");
const password = ref("");
const success = ref("");
const userId = ref("");
const data = ref(null);

if (users.value) {
  console.log("ログイン");
  userId.value = users.value.id;
  //definePageMetaのテスト方法がわからない
  // definePageMeta({ layout: "login" });
} else {
  console.log("ログアウト");
  //definePageMetaのテスト方法がわからない
  // definePageMeta({ layout: "default" });
}

const submit = async (submit: { password: string }) => {
  console.log("あああ");
  if (userId.value !== "") {
    data.value = await client.value.auth.updateUser({
      password: submit.password,
    });
    success.value = "パスワードを再設定しました。";
    //テストで↓を使用するとrouter.pushでエラーが出るためコメントアウト
    // await new Promise((r) => setTimeout(r, 1500));
    router.push({ path: "/login" });
  } else {
    router.push({ path: "/passwordForget" });
  }
};
</script>
