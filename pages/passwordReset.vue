<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">パスワード再設定</h1>
          <div class="flex justify-center">
            <FormKit type="form" @submit="submit" submit-label="登録">
              <div class="mb-5 text-center">
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
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
                  }"
                  type="password"
                  label="確認用パスワード"
                  name="confirmPassword"
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
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");

const submit = async (submit: { password: string }) => {
  await supabase.auth.updateUser({ password: submit.password });
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
