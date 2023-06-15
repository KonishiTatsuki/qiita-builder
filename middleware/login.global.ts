export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();
  const path = "/login";
  const registerpath = "/userRegister";
  const passwordForget = "/passwordForget";
  const passwordReset = "/passwordReset";
  //userが取得出来るまで待機
  await new Promise((r) => setTimeout(r, 1000));

  if (!user.value) {
    if (to.path === path || to.path === registerpath) {
      // console.log("ログイン");
    } else if (
      to.path === registerpath ||
      to.path === passwordForget ||
      to.path === passwordReset
    ) {
      // console.log("ログイン前でも遷移可能ページ");
    } else {
      return navigateTo("/login");
    }
  } else {
    const userId = user.value?.id;
    if (to.path === path || to.path === registerpath) {
      return navigateTo("/");
    }
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
    } else if (to.path === passwordForget) {
      return navigateTo("/");
    }
  }
});
