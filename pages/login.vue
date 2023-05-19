<template>
  <div class="flex">
    <div class="flex-auto">
      <div class="flex justify-center">
        <div class="w-9/12">
          <div class="my-16 text-center">
            <h1 class="title">ログイン</h1>
            <form action="/form/login" method="POST" class="mt-12">
              <div class="flex justify-center">
                <div >
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
                class="px-5 py-2 rounded-md text-base border hover:text-gray-900 mr-5"
              >
                新規登録
              </button>
              <button type="submit" class="btn">ログイン</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
