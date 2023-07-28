import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);
  const body = await readBody(event);

  // 非表示から表示に変更
  const { data } = await supabase
    .from("club")
    .update({ display: true })
    .eq("id", body.displayClub.id);

  return "表示に変更";
});
