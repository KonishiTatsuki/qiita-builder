<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="text-center">
          <h1 class="title">Qiita連携</h1>
          <div class="flex justify-center">
            <div class="pb-[30px] text-left">
              Qiita個人用アクセストークン
              <div>
                <input
                  type="text"
                  maxlength="40"
                  class="border rounded border-black w-[300px]"
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
