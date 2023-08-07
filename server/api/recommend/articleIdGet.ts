import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient(event);
  const { data } = await await spabase
    .from("recommend")
    .select("*")
    .eq("articleId", body.articleId);
  return data;
});
