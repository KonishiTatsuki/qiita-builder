export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  if (!user.value) {
    const path = "/login";
    const registerpath = "/userRegister";
    if (to.path === path) {
      console.log("ログイン");
    } else if (to.path === registerpath) {
      console.log("新規登録");
    } else {
      // return navigateTo("/login");
    }
  } else {
    const userId = user.value?.id;
    if (to.path === "/ownerPage") {
      //ログインユーザのauthority取得
      const { data: authority } = await client
        .from("profiles")
        .select("authority")
        .eq("id", userId);
      //authorityがfalseの時はindexへ
      if (!authority[0].authority) {
        return navigateTo("/");
      }
    }
  }
});
