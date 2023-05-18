<template>
  <div class="flex flex-col md:flex-row">
    <div class="md:w-2/3 p-4">
      <!-- アイコン・ユーザ名・投稿日 -->
      <div class="flex items-center mb-4">
        <!-- アイコン -->
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          class="w-8 h-8 rounded-full mr-2"
        />
        <!-- ユーザ名 -->
        <span class="text-gray-600 text-sm">ユーザ名</span>
        <span class="text-gray-400 text-sm mx-2">・</span>
        <!-- 投稿日 -->
        <span class="text-gray-600 text-sm">投稿日</span>
      </div>
      <!-- 記事タイトル -->
      <h1 class="text-4xl font-bold mb-2">記事タイトル</h1>
      <hr class="border-t-2 border-gray-200" />
      <!-- カテゴリタグ -->
      <div class="flex space-x-2 m-4">
        <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded"
          >カテゴリタグ</span
        >
        <span class="bg-green-100 text-green-600 px-2 py-1 rounded"
          >カテゴリタグ</span
        >
      </div>
      <p class="text-gray-800 mb-4">
        記事内容
        <br />
        <br />
        <br />
        <br />
        <br />
      </p>
      <div class="flex justify-end space-x-4">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          いいね！
        </button>
        <button
          class="bg-[#1D8EB9] text-white px-4 py-2 rounded hover:bg-[#1a7fa6]"
        >
          Qiitaオススメ
        </button>
      </div>
    </div>

    <!-- いいね数・目標までのいいね数・Qiitaオススメした人数 -->
    <div class="md:w-1/3 m-4 p-4 bg-gray-100">
      <div class="mb-4">
        <p class="text-gray-600 text-lg flex justify-center">
          現在の「いいね！」
        </p>
        <p class="text-red-500 text-4xl font-bold flex justify-center m-4">
          123
          <span class="text-lg text-gray-600 align-text-bottom pt-3">件</span>
        </p>
      </div>
      <div class="my-8">
        <span class="text-gray-600 text-lg flex justify-center"
          >目標まで残り</span
        >
        <p class="text-red-500 text-4xl font-bold flex justify-center m-4">
          77
          <span class="text-lg text-gray-600 align-text-bottom pt-3">件</span>
        </p>
      </div>
      <div class="mb-4">
        <span class="text-gray-600 text-lg flex justify-center"
          >Qiitaオススメ</span
        >
        <p class="text-[#1D8EB9] text-4xl font-bold flex justify-center m-4">
          45
          <span class="text-lg text-gray-600 align-text-bottom pt-3">人</span>
        </p>
      </div>
    </div>
  </div>

  <!-- コメントフォーム -->
  <div class="p-4 bg-gray-100">
    <h2 class="text-xl font-bold mb-2">コメント</h2>
    <form class="flex flex-col items-end">
      <textarea
        name="comment"
        id="comment"
        rows="5"
        placeholder="コメントを入力してください"
        class="w-full border border-gray-200 p-2 rounded"
        maxlength="255"
        oninput="document.getElementById('charCount').textContent = this.value.length + '/255'"
      ></textarea>
      <div class="flex mt-3">
        <div id="charCount" class="mt-4 mr-2">0/255</div>
        <button
          type="submit"
          class="bg-[#1D8EB9] text-white px-4 py-2 rounded hover:bg-[#1a7fa6]"
        >
          送信
        </button>
      </div>
    </form>
  </div>
</template>
