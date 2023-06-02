import { serverSupabaseClient } from "#supabase/server";

type Profile = {
  // id: string;
  // username: string;
  // clubid: number;
  // qiitaToken: string;
  // detail: string;
  // email: string;
  // occupation: number;
  // image: string;
  authority: boolean;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseClient(event);
  const { data } = await client
    .from("profiles")
    .select("authority")
    .eq("id", body);

  return data;
});
