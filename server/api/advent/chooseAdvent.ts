import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseClient<Database>(event);
  await client
    .from("banner")
    .update({ display: true })
    .eq("id", body.newAdventValue);
  await client
    .from("banner")
    .update({ display: false })
    .eq("id", body.currentAdventValue);

  return "OK";
});
