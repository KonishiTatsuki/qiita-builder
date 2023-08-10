import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const query = getQuery(event);
  const queryString = JSON.stringify(query.clubid);
  const queryNumber = JSON.parse(queryString);

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("clubid", queryNumber);

  if (data?.length === 0) {
    await supabase.from("club").delete().eq("id", queryNumber);

    return "削除済み";
  } else {
    await supabase
      .from("profiles")
      .update({ clubid: null })
      .eq("clubid", queryNumber);
    await supabase.from("club").delete().eq("id", queryNumber);

    return "削除済み";
  }
});
