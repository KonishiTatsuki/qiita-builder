import { serverSupabaseClient } from "#supabase/server";

type BodySchema = {
  userId: string;
  qiitaToken: number;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<BodySchema>(event);
  const client = serverSupabaseClient<BodySchema>(event);
  const { data } = await client
    .from("profiles")
    .update({ qiitaToken: body.qiitaToken })
    .eq("id", body.userId);
  return data;
});
