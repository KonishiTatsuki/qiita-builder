// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const user = useSupabaseUser();
//   if (!user.value) {
//     const path = "/login";
//     if (to.path !== path) {
//       // return navigateTo("/login");
//       console.log("ログインしていません");
//     }
//   } else {
//     const userId = user.value?.id;
//   }
// });
// import { onMounted } from "vue";

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   let user = null;

//   onMounted(async () => {
//     user = await useSupabaseUser();
//     checkUser(user);
//   });

//   function checkUser(user: any) {
//     if (!user.value) {
//       const path = "/login";
//       if (to.path !== path) {
//         console.log("ログインしていません");
//         // return navigateTo("/login");
//       }
//     } else {
//       const userId = user.value.id;
//       // ここで条件に基づく処理を行います
//     }
//   }
// });

export default async function ({
  app,
  route,
  redirect,
}: {
  app: any;
  route: any;
  redirect: any;
}) {
  // ユーザーの認証状態をチェックするロジックを実装します

  // 未ログインの場合、リダイレクト先のパスを指定します
  const loginPath = "/login";

  if (!app.$supabase.auth.user()) {
    console.log("ログインしていません");
    if (route.path !== loginPath) {
      // ログインしていない場合はログインページにリダイレクトします
      return redirect(loginPath);
    }
  } else {
    console.log("ログインしています");
  }
}
