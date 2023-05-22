import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const body = await readBody(event);

  const { error } = await client.auth.signUp({
    email: body.email,
    password: body.password,
  });
  console.log("error", error);
  return "aaa";
});
