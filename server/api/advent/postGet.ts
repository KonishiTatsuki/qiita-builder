import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const user = useSupabaseUser();
  const { data } = await client.from("article").select("*");

  return data;
});
