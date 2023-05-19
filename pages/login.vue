<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">ログイン</h1>
          <div class="flex justify-center">
            <div>
              <div class="mb-2 text-left">
                メールアドレス
                <div>
                  <input
                    type="email"
                    maxlength="255"
                    placeholder="you@rakus-partners.co.jp"
                    class="border rounded border-black"
                  />
                </div>
              </div>
              <div class="mb-5 text-left">
                パスワード
                <div>
                  <input
                    type="password"
                    maxlength="30"
                    placeholder="password"
                    class="border rounded border-black"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="px-5 py-2 rounded-md text-base border hover:bg-[#1D8EB9] hover:text-white hover:border-indigo-700 mr-5"
          >
            新規登録
          </button>
          <button type="submit" class="btn">ログイン</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  min-height: calc(100vh - 168px);
}
</style>
