import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);
  const body = await readBody(event);

  // 表示から非表示に変更
  const { data } = await supabase
    .from("club")
    .update({ display: false })
    .eq("id", body.nondisplayClub.id);

  return "非表示に変更";
});
