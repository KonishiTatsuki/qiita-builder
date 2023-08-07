import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseClient<Database>(event);
  const { data: userId } = await client
    .from("profiles")
    .select("id")
    .eq("email", body.email);
  if (userId?.length !== 0) {
    userId?.map(async (id) => {
      await client.from("profiles").update({ authority: true }).eq("id", id.id);
    });
    return "OK";
  } else {
    return "Not Found";
  }
});
