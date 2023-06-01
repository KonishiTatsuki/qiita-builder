import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient(event);
  const { data } = await spabase
    .from("article")
    .update({ qiitaPost: true })
    .match({ id: body });
  return data;
});
