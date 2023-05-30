// export default defineEventHandler(async () => {
//   const response = await fetch("http://localhost:8000/club?display=true");
//   const club = await response.json();
//   return club;
// });

import { serverSupabaseClient } from "#supabase/server";
export default defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const { data } = await client.from("club").select().eq("display", true);

  return data;
});
