<template>
  <div class="flex  main">
    <div class="flex-auto my-auto">
      <div class="flex justify-center">
        <div class="w-9/12">
          <div class="my-16 text-center">
            <h1 class="title ">パスワードを忘れた場合</h1>
            <form action="/form/login" method="POST" class="mt-12">
              <div class="flex justify-center">
                <div>
                  <div class="mb-5 text-left">
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
                </div>
              </div>
              <button type="submit" class="btn mb-5">
                パスワード再設定用メール送付
              </button>
              <p>上記メールアドレスに再設定用のURLを送付します。</p>
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
