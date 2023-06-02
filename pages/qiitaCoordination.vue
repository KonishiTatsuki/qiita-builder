<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <form @submit.prevent="submit" class="text-center">
          <h1 class="title">Qiita連携</h1>
          <div class="flex justify-center">
            <div class="pb-[30px] text-left">
              Qiita個人用アクセストークン
              <div>
                <input
                  type="text"
                  maxlength="40"
                  class="border rounded border-black w-[300px]"
                  v-model="text"
                />
              </div>
              <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
            </div>
          </div>

          <button type="submit" class="btn">登録</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const text = ref("");
const errorMessage = ref("");
let confirmation = "";
const userId = user.value?.id;

const submit = async () => {
  const accessToken = text.value;
  fetch("https://qiita.com/api/v2/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      confirmation = data[0];
      if (confirmation) {
        const postData = {
          userId: userId,
          qiitaToken: text.value,
        };
        await useFetch("/api/user/qiitaTokenUpdate", {
          method: "POST",
          body: postData,
        });
        router.push("/");
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
