import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const query = getQuery(event)
  console.log(query)
  const queryString = JSON.stringify(query.id)
  const queryNumber = JSON.parse(queryString)

  const { data } = await client.from("banner").select("*,userId(username)").eq("id", queryNumber);
  return data;
});
