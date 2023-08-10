<template>
  <div class="flex main justify-center">
    <div class="my-auto text-center">
      <h1 class="title">Qiita連携</h1>
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
              type="text"
              label=" Qiita個人用アクセストークン"
              name="text"
              validation="required|length:39,41|matches:/^[a-zA-Z0-9]/"
              autocomplete="off"
              :validation-messages="{
                required: 'アクセストークンを入力してください',
                length: '39文字以上41文字以下で入力してください',
                matches: '半角英数字で入力してください',
              }"
            />
          </div>
          <p v-if="!errorMessage && !successMessage" class="text-red-500">
            　　　
          </p>
          <p v-else-if="errorMessage" class="text-red-500">
            {{ errorMessage }}
          </p>
          <NuxtLink to="/" class="mr-5">
            <button
              type=""
              class="mb-5 bg-[#FFFFFF] border-indigo-700 px-4 py-2 rounded-md text-base border hover:bg-[#1D8EB9] hover:text-white"
            >
              トップへ
            </button></NuxtLink
          >
          <button type="submit" class="btn mb-5">登録</button>
          <p v-if="successMessage">
            {{ successMessage }}
          </p>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHead } from "unhead";
import axios from "axios";
useHead({
  title: "Qiita連携",
});

//useSupabaseUserのテスト方法がわからない為、仮の値を取得
// const user = useSupabaseUser();
const user = ref({ id: "sdafdsvoias" });
const text = ref("");
const successMessage = ref("");
const errorMessage = ref("");
const confirmation = ref("");
const userId = user.value?.id;

const submit = async (submit: { text: string }) => {
  const accessToken = submit.text;
  fetch("https://qiita.com/api/v2/authenticated_user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      confirmation.value = data.id;
      if (confirmation.value) {
        const postData = {
          userId: userId,
          qiitaToken: accessToken,
        };
        // await useFetch("/api/user/qiitaTokenUpdate", {
        //   method: "POST",
        //   body: postData,
        // });
        await axios.post("/api/user/qiitaTokenUpdate", {
          body: postData,
        });
        errorMessage.value = "";
        successMessage.value = "アクセストークンを登録しました";
      } else {
        errorMessage.value = "アクセストークンが存在しません";
      }
    })
    .catch((error) => {
      console.error(error);
    });
  console.log("confirmation", confirmation.value);
};
</script>
