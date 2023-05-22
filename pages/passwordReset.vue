<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">パスワード再設定</h1>
          <div class="flex justify-center">
            <form>
              <div class="mb-5 text-left">
                新パスワード
                <div>
                  <input
                    type="password"
                    maxlength="30"
                    placeholder="password"
                    class="border rounded border-black"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="mb-5 text-left">
                確認用パスワード
                <div>
                  <input
                    type="password"
                    maxlength="30"
                    placeholder="password"
                    class="border rounded border-black"
                    v-model="confirmationPassword"
                  />
                </div>
              </div>
            </form>
          </div>
          <button
            type="submit"
            class="btn"
            @click="resetPass({ password: password })"
          >
            登録
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const password = ref("");
const confirmationPassword = ref("");

const resetPass = async function (e) {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) {
    throw error;
  }

  console.log("パスワードを変更しました。");
  email.value = "";
  password.value = "";
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
