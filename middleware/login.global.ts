export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  // console.log(user.value);

  if (!user.value) {
    const path = "/login";
    if (to.path !== path) {
      return navigateTo("/login");
    }
  } else {
    const userId = user.value?.id;
  }
});
