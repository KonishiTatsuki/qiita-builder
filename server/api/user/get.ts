import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log("body", body);

  const client = serverSupabaseClient(event);
  let { data } = await client
    .from("profiles")
    .select("*,clubid(*),occupation(*)")
    .eq("id", body);
  // console.log(data);

  // const { data } = client.storage.from("avatars").getPublicUrl("earth.png");
  // console.log(image);
  // data[0].img = publicURL;
  return data;
});
