<template>
  <div class="my-15 main">
    <div class="text-right mb-4">
      <v-dialog v-model="dialog" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="light-blue-darken-2" v-bind="props"> 削除する </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5 mt-3">
            本当に削除してよろしいですか？
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
            >
              戻る
            </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="deleteHandler">
              削除する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div>
      <input
        class="border pt-2 pl-2 rounded-lg"
        placeholder="タイトル"
        v-model="title"
        style="width: 100%; height: 50px"
        maxlength="255"
      />
      <div>
        <span class="text-red-500 mt-2">
          {{ errorTitle }}
        </span>
        <span class="block text-right">{{ title.length }}/255</span>
      </div>
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
        <div>
          <span class="text-red-500">
            {{ errorContent }}
          </span>
          <span class="block text-right">{{ content.length }}/255</span>
        </div>
      </div>
    </div>
    <div class="flex justify-around mt-5">
      <div class="block">
        <FormKit type="list" #default="{ value }">
          <FormKit
            :classes="{
              input: 'border border-black py-1 px-2 rounded-md',
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
        <p>公開日</p>
        <input
          type="date"
          class="border border-black py-1 px-2 rounded-md"
          style="width: 175px"
          v-model="publishDate"
          :min="initialPubDate"
        />
      </div>
      <div class="mr-3">
        <div>
          <v-col>
            <v-combobox
              v-model="select"
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
            編集を完了する
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
  title: "記事編集",
});

const route = useRoute();
// パスパラメータよりid取得
const { id } = route.params;
const { data } = await useFetch(`/api/article/get?id=${id}`);

let mde: InstanceType<typeof EasyMDE> | null = null;
const content = ref(data.value?.article[0].body);
const contentArea = ref();
const title = ref(data.value?.article[0].title);
const select = ref(data.value?.tag);
const goalLike = ref(data.value?.article[0].goalLike);
const publishDate = ref(data.value?.article[0].publishDate);
const initialPubDate = ref(data.value?.article[0].publishDate);
const dialog = ref(false);
const router = useRouter();
let errorTitle = ref("");
let errorContent = ref("");
let errorTag = ref("");

// いいね数のプルダウンに活用
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

const submitHandler = async () => {
  //エラーの初期化
  errorTitle.value = "";
  errorContent.value = "";
  errorTag.value = "";

  // 前後の空白を消去
  title.value = title.value?.trim();
  content.value = content.value?.trim();

  //バリデーションチェック
  if (title.value?.length === 0) {
    errorTitle.value = "タイトルを入力してください";
  } else if (title.value.length > 255) {
    errorTitle.value = "タイトルを255字以内で入力してください";
  }
  if (content.value?.length === 0) {
    errorContent.value = "内容を入力してください";
  } else if (content.value.length > 255) {
    errorContent.value = "内容を255字以内で入力してください";
  }
  if (select.value.length === 0) {
    errorTag.value = "タグを一つ以上入力してください";
  }
  select.value?.map((tag: string) => {
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
      id: id,
      title: title,
      body: content,
      goalLike: goalLike,
      date: new Date(),
      publishDate: publishDate,
      publish: true,
    };
    await useFetch("/api/article/patch", {
      method: "PATCH",
      body: { postData: postData, tag: select },
    });
    router.push(`/articleDetail/${id}`);
  }
};
const draftHandler = async () => {
  // 前後の空白を消去
  title.value = title.value?.trim();
  content.value = content.value?.trim();

  const postData = {
    id: id,
    title: title,
    body: content,
    goalLike: goalLike,
    date: new Date(),
    publishDate: publishDate,
    publish: false,
  };
  await useFetch("/api/article/patch", {
    method: "PATCH",
    body: { postData: postData, tag: select },
  });
  router.push("/myPage");
};

const deleteHandler = async () => {
  await useFetch("/api/article/delete", {
    method: "PATCH",
    body: id,
  });
  router.push("/");
};

onMounted(async () => {
  const EasyMDE = (await import("easymde")).default;
  mde = new EasyMDE({
    element: contentArea.value!.$el,
    spellChecker: false,
    status: false,
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
