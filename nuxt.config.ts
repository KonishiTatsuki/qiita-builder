// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@nuxtjs/supabase",
    "@invictus.codes/nuxt-vuetify",
  ],
  css: [
    "@/assets/css/app.css",
    "easymde/dist/easymde.min.css",
    "@/assets/css/style.css",
  ],
  runtimeConfig: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
});
