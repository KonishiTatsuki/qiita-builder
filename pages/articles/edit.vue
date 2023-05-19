<template>
  <div class="my-20 text-right">
    <div>
        <button type="submit" class="btn mb-4">記事を削除</button>
    </div>
    <div>
        <input type="text" class="border" style="width: 100%; height: 50px;" placeholder="タイトル">
    </div>
    <div>
        <textarea placeholder="本文(マークエディタ)" class="border my-10" style="width: 100%; height: 300px;"></textarea>
    </div>
    <div class="flex justify-around mt-5">
        <div>
            <label for="">Qiita自動投稿：</label>
            <select name="like" size="1">
            <option value="">---</option>
            <option>5いいね</option>
            <option>10いいね</option>
            <option>15いいね</option>
            <option>20いいね</option>
            <option>設定しない</option>
        </select>
        </div>
        <div class="mr-36">
            <div>
                <label for="">タグ：</label>
                <input type="text" class="border">
            </div>
            <div>
                <label for="">公開日：</label>
                <input type="date" class="border mt-5" style="width: 200px">
            </div>
        </div>
      <div>
        <span class="mr-4">
            <button type="submit" class="btn">編集完了</button>
        </span>
        <span>
            <button type="submit" class="border py-2 px-2 rounded-md">下書き保存</button>
        </span>
      </div>
    </div>
  </div>
</template>
