import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("body", body);
  const client = serverSupabaseClient(event);
  if (body.commentDate) {
    // await Promise.all(
    //   body.commentDate.map(async (item: { userId: any; username: any; }) => {
    //     // const { data: articleUser } = await useFetch("/api/user/userGet", {
    //     //   method: "POST",
    //     //   body: item.userId,
    //     // });
    //     // console.log("articleUser", articleUser.value);
    //     let { data: users } = await supabase
    //       .from("profiles")
    //       .select("*")
    //       .eq("id", item.userId);
    //     item.username = users[0].username;
    //   })
    // );
  }
  const { data } = await client.from("profiles").select("*").eq("id", body);
  //   console.log("data", data);
  return data;
});
