import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const user = useSupabaseUser();
  const client = serverSupabaseClient(event);
  const { data } = await client.from("article").select("id, userId, title")
  return data;
});
