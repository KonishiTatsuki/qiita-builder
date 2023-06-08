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
                    required: 'パスワードを入力してください',
                    confirm: 'パスワードが一致しません',
                  }"
                />
              </div>
              <div class="flex mb-4 justify-center">
                <button class="btn">登録</button>
              </div>
              <p>{{ success }}</p>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "パスワード再設定",
});

const router = useRouter();
const route = useRoute();
const supabase = useSupabaseClient();
const users = useSupabaseUser();

const email = ref("");
const password = ref("");
const success = ref("");
const userId = ref("");

if (users.value) {
  userId.value = users.value.id;
}


const submit = async (submit: { password: string }) => {
  if (userId.value !== "") {
    const { data, error } = await supabase.auth.updateUser({
      password: submit.password,
    });
    success.value = "パスワードを再設定しました。";
    await new Promise((r) => setTimeout(r, 1500));
    router.push({ path: "/login" });
  } else {
    success.value = "パスワード再設定メールを送信してください";
    await new Promise((r) => setTimeout(r, 2000));
    router.push({ path: "/passwordForget" });
  }
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
