<template>
  <div class="my-20">
      <div class="text-right">
        <button type="submit" class="btn mb-4">記事を削除</button>
    </div>
    <div>
        <input type="text" class="border" style="width: 100%; height: 50px;" placeholder="タイトル" v-model="title">
    </div>
    <div>
  <div class="mt-5">
    <textarea
      ref="contentArea"
      v-model="content"
      rows="5"
      placeholder="markdown形式で説明を記述できます。"
      maxlength="300"
    />
  </div>
  </div>
    <div class="flex justify-around mt-5">
        <div>
            <label for="">Qiita自動投稿：</label>
            <select name="like" size="1" v-model="goalLike" class="border">
            <option value="">---</option>
            <option value="5">5いいね</option>
            <option value="10">10いいね</option>
            <option value="15">15いいね</option>
            <option value="20">20いいね</option>
            <option value="0">設定しない</option>
        </select>
        </div>
        <div class="mr-36">
          <div>
            <v-row>
              <v-col cols="12">
                <v-combobox
                  v-model="select"
                  label="タグを設定してください"
                  multiple
                  chips
                ></v-combobox>
              </v-col>
            </v-row>
            </div>
            <div>
                <label for="">公開日：</label>
                <input type="date" class="border mt-5" style="width: 200px" v-model="publishDate">
            </div>
        </div>
      <div>
        <span class="mr-4">
            <button type="submit" class="btn text-right" @click="handleSubmit">編集を完了する</button>
        </span>
        <span>
            <button type="submit" class="border py-2 px-2 rounded-md" @click="draftSubmit">下書き保存</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
// パスパラメータよりid取得
const { id } = route.params;
const { data } = await useFetch(`/api/article/get?id=${id}`)
import type EasyMDE from "easymde";

let mde: InstanceType<typeof EasyMDE> | null = null;
const content = ref(data.value.article[0].body);
const contentArea = ref();
const title = ref(data.value.article[0].title)
const select = ref(data.value.tag)
const goalLike = ref(data.value.article[0].goalLike)
const publishDate = ref(data.value.article[0].publishDate)
const router = useRouter()

const handleSubmit= async () => {
    const postData = {
      id: id,
      title: title,
      body: content,
      goalLike: goalLike,
      date: new Date(),
      publishDate: publishDate,
      publish: true,
    }
  await useFetch(`/api/article/patch`, {
  method: 'PATCH',
  body: { postData: postData, tag: select}
});
    router.push('/')
}
const draftSubmit= async () => {
    const postData = {
      id: id,
      title: title,
      body: content,
      goalLike: goalLike,
      date: new Date(),
      publishDate: publishDate,
      publish: false,
    }
  await useFetch(`/api/article/patch`, {
  method: 'PATCH',
  body: { postData: postData, tag: select}
});
    router.push('/')
}
onMounted(async () => {
  const EasyMDE = (await import("easymde")).default;
  mde = new EasyMDE({
    element: contentArea.value!.$el,
  });
  mde.codemirror.on("change", () => {
    if (mde) {
      content.value = mde.value();
    }
  });
})


</script>
