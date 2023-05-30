import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const body = await readBody(event);
  console.log(body);
  const { data } = await client.from("banner").select("*").eq("id", body);

  return data;
});
