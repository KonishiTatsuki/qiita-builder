import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  //   const response = await fetch("http://localhost:8000/occupation");
  //   const occupation = await response.json();
  const client = serverSupabaseClient(event);
  const { data } = await client.from("occupation").select();
  //   console.log(data);
  return data;
});
