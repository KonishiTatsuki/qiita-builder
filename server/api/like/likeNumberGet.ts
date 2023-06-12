import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient(event);
  const { data } = await spabase.from("like").select("*").eq("articleId", body);
  return data;
});
