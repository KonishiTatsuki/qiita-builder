import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Article } from "~/types";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const query = getQuery(event);
  const queryString = JSON.stringify(query.userId);
  const queryNumber = JSON.parse(queryString);

  const { data: article }: PostgrestSingleResponse<Article[]> = await supabase
    .from("article")
    .select("*")
    .match({ userId: queryNumber, delete: false })
    .order("date", { ascending: false });
  return article;
});
