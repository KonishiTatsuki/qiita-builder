<template>
  <div class="my-20">
    <div>
      <input
        class="border pt-2 pl-2 rounded-lg"
        placeholder="タイトル"
        v-model="title"
        style="width: 100%; height: 50px"
        maxlength="255"
      />
      <p class="text-red-500 mt-2">
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
        />
        <p class="text-red-500">
          {{ errorContent }}
        </p>
      </div>
    </div>
    <div class="flex justify-around mt-8">
      <div class="block">
        <FormKit type="list" #default="{ value }">
          <FormKit
            :classes="{
              input: 'border border-black py-1 px-2 rounded-md mt-2',
              message: 'text-red-500',
            }"
            label="Qiita自動投稿"
            type="select"
            placeholder="選択してください"
            :options="goalLikeArray"
            v-model="goalLike"
          />
        </FormKit>
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
              style="min-width: 300px"
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
        <span>
          <button
            type="submit"
            class="border py-2 px-2 rounded-md"
            @click="draftHandler"
          >
            下書き保存
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type EasyMDE from "easymde";
import { marked } from "marked";

useHead({
  title: "新規記事投稿",
});

let mde: InstanceType<typeof EasyMDE> | null = null;
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
const users = useSupabaseUser();
const userId = users.value?.id;
let club: number | null | undefined;
let errorTitle = ref("");
let errorContent = ref("");
let errorTag = ref("");

const { data: user } = await useFetch("/api/user/get", {
  method: "POST",
  body: userId,
});

const userData = user.value;

if (userData?.clubid === null) {
  club = null;
} else {
  club = userData?.clubid.id;
}
const occupation = userData?.occupation.id;

const goalLikeArray = [
  {
    value: null,
    label: "設定しない",
  },
  {
    value: "5",
    label: "5いいね",
  },
  {
    value: "10",
    label: "10いいね",
  },
  {
    value: "15",
    label: "15いいね",
  },
  {
    value: "20",
    label: "20いいね",
  },
];

//記事投稿
async function submitHandler() {
  //エラーの初期化
  errorTitle.value = "";
  errorContent.value = "";
  errorTag.value = "";

  //バリデーションチェック
  if (title.value.length === 0) {
    errorTitle.value = "タイトルを入力してください";
  }
  if (content.value.length === 0) {
    errorContent.value = "内容を入力してください";
  }
  select.value.map((tag: string) => {
    if (tag.length > 30) {
      errorTag.value = "タグは各30字以内で入力してください";
    }
  });

  if (
    errorTitle.value === "" &&
    errorContent.value === "" &&
    errorTag.value === ""
  ) {
    const postData = {
      userId: userId,
      clubTagId: club,
      occupationTagId: occupation,
      bannerId: null,
      qiitaPost: false,
      delete: false,
      title: title,
      body: content,
      goalLike: goalLike,
      date: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
      publishDate: publishDate,
      publish: true,
    };
    const { data, error } = await useFetch("/api/article/post", {
      method: "POST",
      body: { article: postData, tagArray: select.value },
    });
    router.push("/");
  }
}

// 下書き記事の投稿
const draftHandler = async () => {
  const postData = {
    userId: userId,
    clubTagId: club,
    occupationTagId: occupation,
    bannerId: null,
    qiitaPost: false,
    delete: false,
    title: title,
    body: content,
    goalLike: goalLike,
    date: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
    publishDate: publishDate,
    publish: false,
  };
  const { data, error } = await useFetch("/api/article/post", {
    method: "POST",
    body: { article: postData, tagArray: select.value },
  });
  router.push("/myPage");
};

onMounted(async () => {
  const EasyMDE = (await import("easymde")).default;
  mde = new EasyMDE({
    element: contentArea.value!.$el,
    spellChecker: false,
    previewRender: (markdownPlaintext) => {
      const htmlContent = marked(markdownPlaintext);
      return `<div class="markdown-preview">${htmlContent}</div>`;
    },
  });
  mde.codemirror.on("change", () => {
    if (mde) {
      content.value = mde.value();
    }
  });
});
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
