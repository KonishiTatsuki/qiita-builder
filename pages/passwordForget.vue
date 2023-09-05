<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">パスワードを忘れた場合</h1>
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
                  type="email"
                  label=" メールアドレス"
                  name="email"
                  validation="required|length:0,255|matches:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/|ends_with:rakus-partners.co.jp"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'メールアドレスを入力してください',
                    matches: '正しいメールアドレスを入力してください',
                    ends_with: '正しい入力形式で入力してください',
                    length: '255文字以内で入力してください',
                  }"
                />
              </div>
              <div class="flex mb-4 justify-center">
                <button class="btn">送信</button>
              </div>
              <p>上記メールアドレスに再設定用のURLを送付します。</p>
              <p class="text-red-500">{{ message }}</p>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from "~/types/database.types";
useHead({
  title: "パスワード再設定用メール送信",
});

const router = useRouter();
const client = useSupabaseClient<Database>();
const email = ref("");
const message = ref("　　");
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const runtimeConfig = useRuntimeConfig();

definePageMeta({ layout: "login" });

const submit = async (submit: { email: string }) => {
  try {
    const { data: correctMail, error } = await client
      .from("profiles")
      .select("*")
      .eq("email", submit.email);

    if (error) {
      // エラーが発生した場合の処理
      console.error("データ取得中にエラーが発生しました:", error);
    } else {
      // エラーが発生しなかった場合の処理
      if (correctMail.length > 0) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          submit.email,
          {
            redirectTo: `${runtimeConfig.public.apiUrl}/passwordReset`,
          }
        );
        message.value = "メールを送信しました。";
      } else {
        message.value = "そのメールアドレスは登録されていません";
      }
    }
  } catch (e) {
    console.error("予期しないエラーが発生しました:", e);
  }
};
</script>
