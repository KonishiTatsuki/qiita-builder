
import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type Article = {
  id: number,
  title: string,
  body: string,
  goalLike: number,
  date: Date
}


export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const query = getQuery(event)

  const x = query.bannerId
  const queryNumber = Number(x)


  console.log("query", query.b)

  console.log("queryNumber", queryNumber)

  const { data, error }: PostgrestSingleResponse<Article[]> = await supabase.from("article").select("*,userId(username)").eq("bannerId", queryNumber)
  console.log("data", data)
  console.log("error", error)
  return data;
})
