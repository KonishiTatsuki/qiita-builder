<script setup>
import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import { useRouter } from "vue-router";
import axios from "axios";

const title = ref("");
const content = ref("");
const router = useRouter();

const draftHandler = async () => {
  const postData = "dammy";
  const { data, error } = await axios.post("/api/article/post", {
    article: postData,
  });
  router.push("/myPage");
};
</script>

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
    </div>
    <div>
      <div class="mt-5">
        <textarea
          v-model="content"
          rows="5"
          placeholder="markdown形式で説明を記述できます。"
          maxlength="255"
          id="content"
        />
      </div>
    </div>
    <div class="mt-4">
      <span>
        <button
          type="submit"
          class="border py-2 px-2 rounded-md"
          @click="draftHandler"
          id="button"
        >
          下書き保存
        </button>
      </span>
    </div>
  </div>
</template>
