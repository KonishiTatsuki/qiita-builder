import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type Article = {
    id: number,
    date: string,
    title: string,
    clubId: number,
    occupationId: number,
    body: string,
    qiitaPost: boolean,
    publishDate: string,
    bannerId: number,
    userId: string,
    goalLike: string
}

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const query = getQuery(event)
    const queryString = JSON.stringify(query.userId)
    const queryNumber = JSON.parse(queryString)

    const { data: article }: PostgrestSingleResponse<Article[]> =  await supabase.from("article").select("*").eq("userId", queryNumber)
    return article
})
