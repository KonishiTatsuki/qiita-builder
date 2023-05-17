<template>
  <!-- <div class="flex justify-center">
    <div>
      <h1 class="text-center">ログイン</h1>
      <ul>
        <li class="flex justify-between">
          <label>メールアドレス</label>
          <input class="border" />
        </li>
        <li class="flex justify-between">
          <label>パスワード</label>
          <input class="border" />
        </li>
        <div class="flex justify-center">
          <button type="submit" class="border">新規登録</button>
          <button type="button" class="border">ログイン</button>
        </div>
      </ul>
    </div>
  </div> -->
  <div class="flex flex-col h-screen">
    <div class="flex-auto">
      <div class="flex justify-center mt-20">
        <div class="w-9/12 border">
          <div class="my-16 text-center">
            <h1 class="title font-bold">ログイン</h1>
            <form action="/form/login" method="POST" class="mt-12">
              <div></div>
              <div class="mb-3">
                <label class=" pr-5">メールアドレス</label>
                <input
                  type="email"
                  placeholder="you@rakus-partners.co.jp"
                  name="email"
                  maxlength='30'
                  class=" w-4/12 border rounded "
                />
              </div>
              <div class="mb-5">
                <label class=" pr-5">パスワード</label>
                <input
                  type="password"
                  placeholder="パスワード"
                  name="password"
                  maxlength='30'
                  class=" w-4/12 border rounded"
                />
              </div>
              <button
                type="submit"
                class="mb-3  w-4/10 py-2 border rounded hover:opacity-75"
              >
                新規登録
              </button>
              <button
                type="submit"
                class="mb-3  w-4/10 bg-blue-800 text-white py-2 rounded hover:opacity-75"
              >
                ログイン
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
