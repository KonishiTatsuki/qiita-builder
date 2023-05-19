<template>
  <div class="flex main pt-10">
    <div class="flex-auto">
      <div class="flex justify-between">
        <div class="w-full pr-[100px]">
          <div>
            <ul class="min-h-[200px]">
              <li>投稿記事一覧</li>
              <hr class="mb-[20px]" />
              <li class="flex items-center justify-between mb-[10px]">
                <a href="" class="w-full"
                  ><p class="ml-[10px]">記事タイル</p></a
                >
                <div class="flex items-center">
                  <button type="submit" class="btn mr-[30px] w-[80px]">
                    編集
                  </button>
                  <p class="w-[100px]">Qiita投稿済み</p>
                </div>
              </li>
              <li class="flex items-center justify-between mb-[10px]">
                <a href="" class="w-full"
                  ><p class="ml-[10px]">記事タイル</p></a
                >
                <div class="flex items-center">
                  <button type="submit" class="btn mr-[30px] w-[80px]">
                    編集
                  </button>
                  <p class="w-[100px]">下書き</p>
                </div>
              </li>
            </ul>
            <ul class="mt-[10px]">
              <li>いいねした記事一覧</li>
              <hr class="mb-[10px]" />
              <li>
                <a href="" class="w-full"
                  ><p class="ml-[10px]">記事タイル</p></a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="w-[300px] mt-[50px]">
          <div>
            <button type="submit" class="btn w-full mb-10">
              ユーザー情報確認
            </button>
          </div>
          <div>
            <button type="submit" class="btn w-full">管理者画面</button>
          </div>
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
