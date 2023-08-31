import { serverSupabaseClient } from "#supabase/server";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = serverSupabaseClient(event);

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_KEY;
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

  const { data: userId } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", body.email);

  if (userId) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId[0].id);
  }

  return "OK";
});
