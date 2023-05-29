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
    const body = await readBody(event)
    const { data, error }: PostgrestSingleResponse<Article[]> =  await supabase.from("article").insert(body).select()
    if(data) {
    return data[0].id
    }
})
