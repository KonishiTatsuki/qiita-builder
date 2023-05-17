<template>
  <div>
    <form action="">
      <div>
        <p class="text-4xl mb-2">新規登録</p>
        <div class="mb-2">
          メールアドレス
          <div><input type="text" class="border border-black" /></div>
        </div>
        <div class="mb-2">
          パスワード
          <div><input type="text" class="border border-black" /></div>
        </div>
        <div class="mb-2">
          パスワード確認用
          <div><input type="text" class="border border-black" /></div>
        </div>
      </div>
      <div class="mb-2">
        サークル名
        <div>
          <select name="" id="">
            <option value="">その他</option>
            <input type="text" class="border border-black" />
          </select>
        </div>
      </div>
      <div class="mb-2">
        職種
        <div class="flex">
          <button type="button" class="rounded-xl border border-black w-11">
            JAVA
          </button>
          <button type="button" class="rounded-xl border border-black w-11">
            CL
          </button>
          <button type="button" class="rounded-xl border border-black w-11">
            PHP
          </button>
          <button type="button" class="rounded-xl border border-black w-11">
            FR
          </button>
          <button type="button" class="rounded-xl border border-black w-11">
            ML
          </button>
          <button type="button" class="rounded-xl border border-black w-11">
            QA
          </button>
          <button type="button" class="rounded-xl border border-black w-11">
            営業
          </button>
          <button type="button" class="rounded-xl border border-black w-11">
            内勤
          </button>
          <button type="button" class="rounded-xl border border-black w-11">
            CS
          </button>
        </div>
      </div>
      <div class="mb-2">
        アイコン画像
        <div><button class="border-black border">ファイルを保存</button></div>
      </div>
      <div>
        自己紹介
        <div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            class="border border-black"
          ></textarea>
        </div>
      </div>

      <div class="flex">
        <button>登録してQiitaへ進む</button> <button>登録する</button>
      </div>
    </form>
  </div>
</template>
