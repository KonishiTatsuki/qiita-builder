import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("bodyyy", body);

  const client = serverSupabaseClient<Database>(event);
  let clubId = null;

  if (body.addClub) {
    //その他クラブの登録
    await client.from("club").insert({
      clubName: body.addClub,
    });
    const { data } = await client
      .from("club")
      .select("id")
      .eq("clubName", body.addClub);

    if (data !== null) {
      clubId = data[0].id;
    }
  }

  if (!clubId) {
    const { data, error } = await client.from("profiles").upsert({
      id: body.id,
      username: body.userName,
      occupation: body.occupation,
      clubid: body.club,
      detail: body.detail,
    });
    console.log(data, error);
    return error;
  } else {
    const { data, error } = await client.from("profiles").upsert({
      id: body.id,
      username: body.userName,
      occupation: body.occupation,
      clubid: clubId,
      detail: body.detail,
    });
    console.log(data, error);
    return error;
  }
});
