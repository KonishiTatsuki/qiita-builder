export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("common middleware");
  const supabase = useSupabaseClient();
  let data = await supabase.auth.getSession();
  if (data.data.session) {
    console.log("ログイン");
    // return;
  } else {
    const path = "/login";
    // return { path };
    if (to.path !== path) {
      console.log("未ログイン");
      return { path };
    }
  }
});
