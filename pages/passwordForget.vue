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
              submit-label="パスワード再設定用メール送付"
            >
              <div class="mb-5 text-center">
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
            </FormKit>
          </div>
          <p>上記メールアドレスに再設定用のURLを送付します。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const supabase = useSupabaseClient();

const email = ref("");

const submit = async (submit) => {
  await supabase.auth.resetPasswordForEmail(
    "tatsuki.konishi@rakus-partners.co.jp",
    {
      redirectTo: "http://localhost:3000/passwordReset",
    }
  );
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
