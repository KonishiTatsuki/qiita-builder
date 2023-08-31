import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = serverSupabaseClient(event);
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", body.email);

  if (data?.length === 0) {
    return "Not Found";
  } else {
    return "OK";
  }
});
