import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient(event);
  const { data } = await spabase
    .from("recommend")
    .select("*")
    .eq("articleId", body);
  return data;
});
