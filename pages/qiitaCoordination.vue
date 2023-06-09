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
              validation="matches:/^[a-zA-Z0-9]/"
              autocomplete="off"
              :validation-messages="{
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
useHead({
  title: "Qiita連携",
});

const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const text = ref("");
const successMessage = ref("");
const errorMessage = ref("");
let confirmation = "";
const userId = user.value?.id;

const submit = async (submit: { text: string }) => {
  errorMessage.value = "";
  const accessToken = submit.text;

  fetch("https://qiita.com/api/v2/authenticated_user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      confirmation = data;
      if (confirmation) {
        const postData = {
          userId: userId,
          qiitaToken: accessToken,
        };
        await useFetch("/api/user/qiitaTokenUpdate", {
          method: "POST",
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
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
