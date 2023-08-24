<template>
  <div class="text-center main">
    <div class="text-2xl pt-24 tracking-widest">
      <span class="mdi mdi-block-helper text-red-500"></span>
      このページにはアクセスできません
    </div>
    <hr class="my-9" />
    <div>管理者権限がないユーザーです</div>
    <div class="pt-3">5秒後にマイページに遷移します</div>
  </div>
</template>

<script>
setTimeout(function () {
  window.location = "http://localhost:3000/mypage";
}, 5000);
</script>

<style></style>
