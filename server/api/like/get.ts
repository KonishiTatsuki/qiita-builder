import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type ArticleId = {
    articleId :number
}

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const query = getQuery(event)
    const queryString = JSON.stringify(query.userId)
    const queryNumber = JSON.parse(queryString)

    const { data: articleId }: PostgrestSingleResponse<ArticleId[]> =  await supabase.from("like").select("articleId").eq("userId", queryNumber)
    if(articleId !== null && articleId.length > 0) {
        return articleId
    } else {
        return "No data"
    }
})
