import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient<Database>(event);
  const { data } = await spabase
    .from("article")
    .update({ qiitaPost: true })
    .match({ id: body });
  return data;
});
