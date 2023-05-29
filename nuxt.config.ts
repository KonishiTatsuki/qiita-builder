// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // modules: ["@nuxtjs/tailwindcss", "@formkit/nuxt"],
  modules: ["@nuxtjs/tailwindcss", "@formkit/nuxt", "@nuxtjs/supabase"],
  css: ["@/assets/css/app.css", "easymde/dist/easymde.min.css"],
  runtimeConfig: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
  router: {
    middleware: ["login"],
  },
});
