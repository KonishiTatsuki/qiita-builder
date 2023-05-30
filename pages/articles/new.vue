<template>
  <div class="my-20">
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
                  :items="items"
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
            <button type="submit" class="btn text-right" @click="submitHandler">投稿する</button>
        </span>
        <span>
            <button type="submit" class="border py-2 px-2 rounded-md" @click="draftHandler">下書き保存</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type EasyMDE from "easymde";

let mde: InstanceType<typeof EasyMDE> | null = null;
let items = ref(["Java", "PHP", "JavaScript", "Python", "Ruby", "フロントエンド", "バックエンド", "クラウド"])
const select = ref([])
const content = ref('');
const contentArea = ref();
const title = ref('');
const goalLike = ref('');
const publishDate = ref('');
const router = useRouter();
const users = useSupabaseUser();
const userId = users.value.id;

//記事投稿
async function submitHandler() {
  const postData = {
    userId: userId,
    // clubTagId: clubTagId,
    // occupationId: occupationId,
    bannerId: null,
    qiitaPost: false,
    delete: false,
    title: title,
    body: content,
    goalLike: goalLike,
    date: new Date(),
    publishDate: publishDate,
    publish: true,
  }
    const { data } = await useFetch('/api/article/post', {
    method: 'POST',
    body: postData,
  })
  .then(
    // タグの投稿
    async(id) => {
    const articleId = id.data.value
    const { data } = await useFetch('/api/tag/post', {
    method: 'POST',
    body: {tagArray: select.value, articleId: articleId},
  })
    router.push('/')
})
}

// 下書き記事の投稿
const draftHandler= async () => {
  const postData = {
    userId: userId,
    // clubTagId: clubTagId,
    // occupationId: occupationId,
    bannerId: null,
    qiitaPost: false,
    delete: false,
    title: title,
    body: content,
    goalLike: goalLike,
    date: new Date(),
    publishDate: publishDate,
    publish: false
  }
  const { data } = await useFetch('/api/article/post', {
    method: 'POST',
    body: postData,
  })
  .then(
    // タグの投稿
    async(id) => {
    const articleId = id.data.value
    const { data } = await useFetch('/api/tag/post', {
    method: 'POST',
    body: {tagArray: select.value, articleId: articleId},
  })
    router.push('/')
})

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
