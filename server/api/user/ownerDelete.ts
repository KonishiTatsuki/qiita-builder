import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseClient<Database>(event);
  await client.from("profiles").update({ authority: false }).eq("id", body.id);

  return "OK";
});
