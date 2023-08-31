import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = serverSupabaseClient(event);
  const { data } = await supabase
    .from("profiles")
    .select("qiitaToken")
    .eq("id", body);

  if (data?.length === 0) {
    return null;
  } else {
    return data[0].qiitaToken;
  }
});
