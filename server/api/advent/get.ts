import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const { data } = await client.from("banner").select("*,userId(username)").eq("id", 5);

  return data;
});;
