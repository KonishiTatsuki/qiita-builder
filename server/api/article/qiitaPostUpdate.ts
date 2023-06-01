import { serverSupabaseClient } from "#supabase/server";

type BodySchema = string;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient<BodySchema>(event);
  const { data } = await spabase
    .from("article")
    .update({ qiitaPost: true })
    .match({ id: body });
  return data;
});
