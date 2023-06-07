import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient(event);
  await spabase.from("comment").delete().eq("id", body);
  const message = "削除しました"
  return message
});
