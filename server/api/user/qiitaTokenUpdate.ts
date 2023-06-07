import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseClient<Database>(event);
  const { data } = await client
    .from("profiles")
    .update({ qiitaToken: body.qiitaToken })
    .eq("id", body.userId);
  return data;
});
