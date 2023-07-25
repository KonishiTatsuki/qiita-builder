import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);
  const body = await readBody(event);

  // クラブが既に存在しているか確認する
  const { data } = await supabase
    .from("club")
    .select("*")
    .eq("clubName", body.newclub);

  // 存在していない場合、新しく追加する
  if (data?.length === 0) {
    await supabase
      .from("club")
      .insert({ clubName: body.newclub, display: false, count: 1 })
      .select();
    return "登録完了";
  } else {
    return "登録済み";
  }
});
