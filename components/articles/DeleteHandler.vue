<template>
  <div class="text-right mb-4">
    <button @click="deleteHandler">削除する</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const id = 1;

const deleteHandler = async () => {
  await axios.patch("/api/article/delete", {
    body: id,
  });
  router.push("/");
};
</script>

<style></style>
