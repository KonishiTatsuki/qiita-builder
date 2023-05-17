<template>
  <div class="flex">
    <div class="flex-auto">
      <div class="flex justify-center">
        <div class="w-9/12">
          <div class="my-16 text-center">
            <h1 class="title font-bold">ログイン</h1>
            <form action="/form/login" method="POST" class="mt-12">
              <div class="mb-3">
                メールアドレス
                <input
                  type="email"
                  placeholder="you@rakus-partners.co.jp"
                  name="email"
                  maxlength="30"
                  class="w-4/12 border rounded"
                />
              </div>
              <div class="mb-5">
                パスワード
                <input
                  type="password"
                  placeholder="パスワード"
                  name="password"
                  maxlength="30"
                  class="w-4/12 border rounded"
                />
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
