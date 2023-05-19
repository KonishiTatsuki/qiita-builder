<template>
  <div class="my-10">
    <div>
        <input type="text" class="border" style="width: 100%; height: 50px;" placeholder="タイトル">
    </div>
    <br>
    <div>
        <textarea placeholder="本文(マークエディタ)" class="border" style="width: 100%; height: 300px;"></textarea>
    </div>
    <!-- <div>
        <h1 style="text-align: center;">Vue-multiselect</h1>
        <multiselect
          v-model="value"
          :multiple="true"
          :options="options"
        ></multiselect>
    </div> -->
      <div>
        <button type="submit" class="btn mt-5">投稿する</button>  
      </div>
  </div>

</template>

<script>
// import Vue from 'vue'
// import Multiselect from 'vue-multiselect'
// Vue.component('multiselect', Multiselect)
// export default {
//   components: { Multiselect },
//   data() {
//     return {
//       value: null,
//       options: ['list', 'of', 'options'],
//     }
//   },
// }
</script>
