<template>
  <div class="flex main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="w-9/12">
          <div class="my-16 text-center ">
            <h1 class="title">パスワード再設定</h1>
            <form action="/form/login" method="POST" class="mt-12">
              <div class="flex justify-center">
                <div>
                  <div class="mb-5 text-left">
                    新パスワード
                    <div>
                      <input
                        type="password"
                        maxlength="30"
                        placeholder="password"
                        class="border rounded border-black"
                      />
                    </div>
                  </div>
                  <div class="mb-5 text-left">
                    確認用パスワード
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
              <button type="submit" class="btn">登録</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main{
  min-height: calc(100vh - 168px);
}
</style>
