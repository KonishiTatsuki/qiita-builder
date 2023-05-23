<template>
  <!-- <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">ログイン</h1>
          <div class="flex justify-center">
            <FormKit
              type="form"
              @submit="signInWithEmail"
              submit-label="ログイン"
            >
              <div class="mb-2 text-left">
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
              <div class="mb-5 text-left">
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
              <button
                type="submit"
                class="px-5 py-2 rounded-md text-base border hover:bg-[#1D8EB9] hover:text-white hover:border-indigo-700 mr-5"
              >
                <NuxtLink to="/userRegister">新規登録</NuxtLink>
              </button>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="container">
    <form @submit.prevent="submit">
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <input type="submit" value="ログイン" />
    </form>
  </div>
</template>

<script setup>
const router = useRouter();
const client = useSupabaseClient();

const email = ref("");
const password = ref("");

const submit = async () => {
  console.log(email.value, password.value);
  const session = await client.auth.signIn({
    email: email.value,
    password: password.value,
  });
  if (session) {
    location.href = "/";
  }
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
