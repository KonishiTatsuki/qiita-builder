/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/articleList.vue", // 追加
    "./pages/articleDetail.vue", // 追加
    "./node_modules/flowbite.{js,ts}", // 追加
  ],
  theme: {
    extend: { formKitTailwind },
  },
  plugins: [FormKitVariants, require('flowbite/plugin')
  ],
};
