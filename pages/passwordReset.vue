<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
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

definePageMeta({ layout: "login" });

const submit = async (submit: { password: string }) => {
  const { data, error } = await supabase.auth.updateUser({
    password: submit.password,
  });
  success.value = "パスワードを再設定しました。";
  await new Promise((r) => setTimeout(r, 1500));
  router.push({ path: "/login" });
};
</script>

<style>
/* ローディング画面のスタイル（CSSを適切にカスタマイズしてください） */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明の背景 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loader {
  border: 4px solid #f3f3f3; /* ローディングアイコンのスタイル */
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
