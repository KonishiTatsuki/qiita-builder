<template>
  <div class="my-20">
    <div>
      <input
        class="border pt-2 pl-2 rounded-lg"
        placeholder="タイトル"
        v-model="title"
        style="width: 100%; height: 50px"
        maxlength="255"
        id="title"
      />
      <p class="text-red-500 mt-2" id="errorTitle">
        {{ errorTitle }}
      </p>
    </div>
    <div>
      <div class="mt-5">
        <textarea
          ref="contentArea"
          v-model="content"
          rows="5"
          placeholder="markdown形式で説明を記述できます。"
          maxlength="255"
          id="content"
        />
        <p class="text-red-500" id="errorContent">
          {{ errorContent }}
        </p>
      </div>
    </div>
    <div class="flex justify-around mt-8">
      <div class="block">
        <label for="like">Qiita自動投稿</label>
        <br />
        <select
          name="like"
          id="like"
          class="border border-black py-1 px-2 rounded-md mt-2"
          v-model="goalLike"
        >
          <option value="">選択してください</option>
          <option value="null">設定しない</option>
          <option value="5">5いいね</option>
          <option value="10">10いいね</option>
          <option value="15">15いいね</option>
          <option value="20">20いいね</option>
        </select>
      </div>
      <div>
        <div class="flex">
          <p>公開日</p>
          <span class="text-xs w-40 ml-2"
            >※設定しない場合、自動的に本日の日付が入ります。</span
          >
        </div>
        <input
          type="date"
          class="border border-black py-1 px-2 rounded-md"
          style="width: 200px"
          v-model="publishDate"
        />
      </div>
      <div class="mr-36">
        <div>
          <v-col>
            <v-combobox
              v-model="select"
              :items="items"
              label="タグを設定してください"
              multiple
              chips
              style="width: 350px"
            ></v-combobox>
          </v-col>
        </div>
        <p class="text-red-500 ml-5">
          {{ errorTag }}
        </p>
      </div>
      <div class="mt-4">
        <span class="mr-4">
          <button type="submit" class="btn text-right" @click="submitHandler">
            投稿する
          </button>
        </span>
        <span> </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

let items = ref([
  "Java",
  "PHP",
  "JavaScript",
  "Python",
  "Ruby",
  "フロントエンド",
  "バックエンド",
  "クラウド",
]);

const date = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });

const select = ref([]);
const content = ref("");
const contentArea = ref();
const title = ref("");
const goalLike = ref("");
const publishDate = ref(date);
const router = useRouter();
let errorTitle = ref("");
let errorContent = ref("");
let errorTag = ref("");

//記事投稿
async function submitHandler() {
  //エラーの初期化
  errorTitle.value = "";
  errorContent.value = "";

  //バリデーションチェック
  if (title.value.length === 0) {
    errorTitle.value = "タイトルを入力してください";
  }
  if (content.value.length === 0) {
    errorContent.value = "内容を入力してください";
  }

  if (errorTitle.value === "" && errorContent.value === "") {
    const postData = {
      title: title.value,
      body: content.value,
    };
    console.log(postData);
    const { data } = await axios.post("/api/article/post", {
      article: postData,
    });
    router.push("/");
  }
}
</script>
<style>
.markdown-preview ul,
.markdown-preview h1,
.markdown-preview h2,
.markdown-preview h3,
.markdown-preview h4,
.markdown-preview h5,
.markdown-preview p,
.markdown-preview a,
.markdown-preview blockquote,
.markdown-preview pre,
.markdown-preview img,
.markdown-preview table,
.markdown-preview th,
.markdown-preview td,
.markdown-preview strong,
.markdown-preview em {
  all: revert;
}
</style>
