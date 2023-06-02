import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient(event);
  const { data } = await spabase
    .from("like")
    .select("*")
    .eq("userId", body.userId)
    .eq("articleId", body.articleId);
  return data;
});
