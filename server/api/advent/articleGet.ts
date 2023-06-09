
import { serverSupabaseClient } from "#supabase/server";
// import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Database } from "~/types/database.types";


export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);
  const query = getQuery(event)

  const x = query.bannerId
  const queryNumber = Number(x)
  // const currentDate = new Date();

  console.log("query", query.b)
  console.log("queryNumber", queryNumber)

  const { data, error } = await supabase.from("article").select("*,userId(*)").eq("bannerId", queryNumber).eq("publish", true)
  console.log("data", data)
  console.log("error", error)
  return data;
})


//  const { data, error } = await supabase.from("article").select("*,userId(username)").gte("publishDate", currentDate.toISOString()).eq("bannerId", queryNumber).eq("publish", true)
