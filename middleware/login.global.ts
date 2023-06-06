export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  if (!user.value) {
    const path = "/login";
    const registerpath = "/userRegister";
    const passwordForget = "/passwordForget";
    const passwordReset =
      "/passwordReset#error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired";
    if (to.path === path) {
      console.log("ログイン");
    } else if (
      to.path === registerpath ||
      to.path === passwordForget ||
      to.path === passwordReset
    ) {
      console.log("ログイン前でも遷移可能ページ");
    } else {
      return navigateTo("/login");
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
