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
            </div>
          </div>
          <button
            type="submit"
            class="px-5 py-2 rounded-md text-base border hover:bg-[#1D8EB9] hover:border-indigo-700 hover:text-white mr-5"
          >
            ← 戻る
          </button>
          <button type="submit" class="btn">ログイン</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const supabase = useSupabaseClient();
const text = ref("");

const submit = async () => {
  const data = await supabase.auth.getSession();
  if (data) {
    const { error } = await supabase
      .from("profiles")
      .update({ qiitaToken: text.value })
      .eq("id", data.data.session.user.id);
  }
};
</script>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
