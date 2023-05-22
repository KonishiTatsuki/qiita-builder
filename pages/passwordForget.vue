<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">パスワードを忘れた場合</h1>
          <div class="flex justify-center">
            <form>
              <div class="mb-5 text-left">
                メールアドレス
                <div>
                  <input
                    type="email"
                    maxlength="255"
                    placeholder="you@rakus-partners.co.jp"
                    class="border rounded border-black"
                    v-model="email"
                  />
                </div>
              </div>
            </form>
          </div>
          <button
            type="submit"
            class="btn mb-5"
            @click="signIn({ email: email })"
          >
            パスワード再設定用メール送付
          </button>
          <p>上記メールアドレスに再設定用のURLを送付します。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");
const loading = ref(false);

const signIn = async function (e) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://localhost:3000/passwordReset`,
  });
  if (error) {
    throw error;
  }
  console.log("メールを送信しました。");
  email.value = "";
  password.value = "";
};
</script>
W
<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
