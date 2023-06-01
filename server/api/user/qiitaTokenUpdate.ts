import { serverSupabaseClient } from "#supabase/server";

type BodySchema = {
  userId: string;
  qiitaToken: string;
};
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseClient<BodySchema>(event);
  const { data } = await client
    .from("profiles")
    .update({ qiitaToken: body.qiitaToken })
    .eq("id", body.userId);
  return data;
});
