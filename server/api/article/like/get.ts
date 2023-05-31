import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type ArticleId = {
    articleId :number
}

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const query = getQuery(event)
    const queryString = JSON.stringify(query.id)
    const queryNumber = JSON.parse(queryString)

    const { data: articleTitle }: PostgrestSingleResponse<ArticleId[]> =  await supabase.from("article").select("title").eq("id", queryNumber)
    if(articleTitle !== null && articleTitle.length > 0) {
        return articleTitle
    } else {
        return "No data"
    }
})
