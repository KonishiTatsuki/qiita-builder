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
          <NuxtLink to="/" class="mr-5">
            <button
              type=""
              class="mb-5 bg-[#FFFFFF] border-indigo-700 px-4 py-2 rounded-md text-base border hover:bg-[#1D8EB9] hover:text-white"
            >
              トップへ
            </button></NuxtLink
          >
          <button type="submit" class="btn mb-5">登録</button>
          <p class="text-red-500">{{ message }}</p>
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
// const successMessage = ref("");
// const errorMessage = ref("");
const message = ref("　");
let confirmation = "";
const userId = user.value?.id;

const submit = async (submit: { text: string }) => {
  message.value = "　";
  const accessToken = submit.text;

  fetch("https://qiita.com/api/v2/authenticated_user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      confirmation = data.id;
      if (confirmation) {
        const postData = {
          userId: userId,
          qiitaToken: accessToken,
        };
        await useFetch("/api/user/qiitaTokenUpdate", {
          method: "POST",
          body: postData,
        });
        message.value = "　";
        message.value = "アクセストークンを登録しました";
      } else {
        message.value = "アクセストークンが存在しません";
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
