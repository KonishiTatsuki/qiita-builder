<template>
  <div class="flex main justify-center">
    <div class="my-auto text-center">
      <h1 class="title">ログイン</h1>
      <div class="flex justify-center">
        <FormKit
          type="form"
          @submit="submit"
          :actions="false"
          incomplete-message=" "
        >
          <div class="mb-3 text-center">
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
                length:'255文字以内で入力してください'
              }"
            />
          </div>
          <div class="text-center">
            <FormKit
              :classes="{
                input: 'border border-black py-1 px-2 rounded-md',
                message: 'text-red-500',
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
          <p class="text-red-500 mb-5">{{ errorMessage }}</p>
          <div class="flex justify-center">
            <NuxtLink to="/userRegister"
              ><button class="mb-2 mr-10 mb-5 bg-[#FFFFFF] border-indigo-700 px-4 py-2 rounded-md text-base border hover:bg-[#1D8EB9] hover:text-white">新規登録</button></NuxtLink
            >
            <div class="flex mb-4 justify-center">
              <button class="btn">ログイン</button>
            </div>
          </div>
          <NuxtLink to="/passwordForget"
            ><div>※パスワードを忘れた場合</div>
          </NuxtLink>
        </FormKit>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "ログイン",
});

definePageMeta({ layout: "login" });
const router = useRouter();
const client = useSupabaseClient();

const errorMessage = ref("　　　");

const submit = async (submit: { email: string; password: string }) => {
  const { data: signInData } = await client.auth.signInWithPassword({
    email: submit.email,
    password: submit.password,
  });
  if (signInData && signInData.session) {
    router.push("/");
  } else {
    errorMessage.value = "メールアドレスまたはパスワードが間違っています";
  }
};
</script>
