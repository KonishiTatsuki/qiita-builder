import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseClient(event);
  const { data } = await client
    .from("tag")
    .update({ count: body.count + 1 })
    .eq("id", body.id);

  return data;
});