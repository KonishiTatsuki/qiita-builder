<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">パスワードを忘れた場合</h1>
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
                  type="email"
                  label=" メールアドレス"
                  name="email"
                  validation="required|length:0,255|matches:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/|ends_with:rakus-partners.co.jp"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'メールアドレスを入力してください',
                    matches: '正しいメールアドレスを入力してください',
                    ends_with: '正しい入力形式で入力してください',
                    length: '255文字以内で入力してください',
                  }"
                />
              </div>
              <div class="flex mb-4 justify-center">
                <button class="btn">送信</button>
              </div>
              <p>上記メールアドレスに再設定用のURLを送付します。</p>
              <!-- <p v-if="success" class="text-red-500">{{ success }}</p>
              <p v-else-if="errors" class="text-red-500">{{ errors }}</p>
              <p v-else>上記メールアドレスに再設定用のURLを送付します。</p> -->
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
  title: "パスワード再設定用メール送信",
});

// const router = useRouter();
// const client = useSupabaseClient();
const client = ref(
  createClient(
    "https://niezwnppucjwhxwfaxyr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZXp3bnBwdWNqd2h4d2ZheHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3MjkzNDAsImV4cCI6MjAwMDMwNTM0MH0.04tShAmtbz0zXhsyNQYo2fhcO2Tx0aQdI67Cg2f3BTo"
  )
);

const email = ref("");
const errors = ref("");
const success = ref("");
const data = ref(null);

const submit = async (submit: { email: string }) => {
  data.value = await client.value.auth.resetPasswordForEmail(submit.email, {
    redirectTo: "http://localhost:3000/passwordReset",
  });
  // if (data !== null) {
  //   console.log(Object.keys(data).length);
  //   console.log("error", error);
  // }
  // // if (error === null) {
  // //   console.log("error", error);
  // //   errors.value = "メールアドレスが登録されていません。";
  // // } else{
  // //   success.value = "メールを送信しました。";
  // // }
};
</script>
