import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("bodyyy", body);

  const client = serverSupabaseClient<Database>(event);
  const { data, error } = await client.from("profiles").upsert({
    id: body.id,
    username: body.userName,
    occupation: body.occupation,
    clubid: body.club,
    detail: body.detail,
  });
  console.log(data, error);
  return error;
});
