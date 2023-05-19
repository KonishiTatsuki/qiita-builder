<template>
  <h1 class="title">管理者画面</h1>
  <div class="flex items-center">
    <div>バナー表示：</div>
    <div>
      <select name="" id="" class="border border-black">
        <option value="">アドベントカレンダー選択</option>
      </select>
    </div>
    <div class="btn ml-2">保存</div>
  </div>
  <div class="mt-6 flex items-center">
    <div class="flex">
      <div>アドベントカレンダー：</div>
      <div>
        <div><button class="btn mb-3">新規登録</button></div>
        <div>
          <select name="" id="" class="border border-black">
            <option value="">アドベントカレンダー選択</option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex mt-12 ml-2">
      <div><button class="btn">編集</button></div>
    </div>
  </div>
  <div>
    <div>タグ編集：</div>
    <div class="border border-black p-4 w-2/5">
      <div class="flex">
        <div>サークルタグ</div>
        <div><input type="text" class="border border-black ml-2 p-1" /></div>
        <div>
          <button class="ml-2 p-1 btn">追加</button>
        </div>
      </div>
      <div class="mt-3">
        <ul class="flex">
          <li><input type="checkbox" />タグ１</li>
          <li><input type="checkbox" />タグ2</li>
          <li><input type="checkbox" />タグ3</li>
        </ul>
      </div>
      <div class="flex justify-end">
        <div class="mr-2">
          <button class="btn p-1">削除</button>
        </div>
        <div><button class="btn p-1">表示</button></div>
      </div>
    </div>
  </div>
  <div>
    <div class="mt-3">表示：</div>
    <div class="border border-black p-4 w-2/5">
      <div>サークルタグ</div>
      <div class="mt-3">
        <ul class="flex">
          <li><input type="checkbox" />タグ１</li>
          <li><input type="checkbox" />タグ2</li>
          <li><input type="checkbox" />タグ3</li>
        </ul>
      </div>
      <div class="flex justify-end">
        <div class="mr-2">
          <button class="btn p-1">表示</button>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-5">
    <div>管理者権限:</div>
    <p>管理者権限を与えたい社員のメールアドレスを入力してください</p>
    <div class="flex items-center">
      <div><input type="text" class="border border-black" /></div>
      <div><button class="btn ml-2">保存</button></div>
    </div>
  </div>
  <div class="mt-5">
    <div>管理者一覧：</div>
    <div>
      <table class="border-collapse border border-slate-500 border-spacing-2">
        <tr>
          <td class="border border-slate-500 px-2">
            shuhei.hayakawa@rakus-partners.co.jp
          </td>
          <td class="border border-slate-500 px-2">ユーザ名</td>
          <td class="border border-slate-500 px-2">
            <button class="btn px-2">削除</button>
          </td>
        </tr>
        <tr>
          <td class="border border-slate-500 px-2">
            shuhei.hayakawa@rakus-partners.co.jp
          </td>
          <td class="border border-slate-500 px-2">ユーザ名</td>
          <td class="border border-slate-500 px-2">
            <button class="btn px-2">削除</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
