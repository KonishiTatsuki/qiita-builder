export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("common middleware");
  const supabase = useSupabaseClient();
  let data = await supabase.auth.getSession();
  if (data.data.session) {
    console.log("ログイン");
  } else {
    console.log("未ログイン");
    // return redirect("/login");
  }
});
