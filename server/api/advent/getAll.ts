import { serverSupabaseClient } from "#supabase/server";
import { Banner } from "~/types";
export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);

  let { data } = await client.from("banner").select("*").eq("display", true);
  if (data) {
    const trueAdvent: Banner = data[0];

    return trueAdvent;
  }
});
