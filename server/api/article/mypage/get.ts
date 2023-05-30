import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type Article = {
    
}

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const query = getQuery(event)
    const queryString = JSON.stringify(query.userId)
    const queryNumber = JSON.parse(queryString)
    console.log(queryNumber)

    const { data: article }: PostgrestSingleResponse<Article[]> =  await supabase.from("article").select("*").eq("userId", queryNumber)
    return article
})
