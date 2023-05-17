<template>
  <div class="flex flex-col h-screen">
    <div class="flex-auto">
      <div class="flex justify-center mt-20">
        <div class="border">
          <div class="my-16 text-center">
            <h1 class="title font-bold">ログイン</h1>
            <form action="/form/login" method="POST" class="mt-12">
              <div></div>
              <div class="mb-3">
                <label class="pr-5">メールアドレス</label>
                <input
                  type="email"
                  placeholder="you@rakus-partners.co.jp"
                  name="email"
                  maxlength="30"
                  class="w-4/12 border rounded"
                />
              </div>
              <div class="mb-5">
                <label class="pr-5">パスワード</label>
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
