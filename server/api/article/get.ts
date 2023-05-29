import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type Article = {
    id: number,
    title: string,
    body: string,
    goalLike: number,
    date: Date
}

type Tagging = {
    id: number,
    articleId: number,
    tagId: number,
    tag: {id: number, name: string, display: boolean}
}

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const query = getQuery(event)
    const queryString = JSON.stringify(query.id)
    const queryNumber = JSON.parse(queryString)
    
    const { data: article }: PostgrestSingleResponse<Article[]> =  await supabase.from("article").select("*").eq("id", queryNumber)
    const { data: tag }: PostgrestSingleResponse<Tagging[]> = await supabase.from("tagging").select("*, tag(*)").eq("articleId", queryNumber).order("name", {foreignTable: "tag"})
    console.log(tag)
    const tagArray: string[] = []
    tag?.map((tag) => {
        tagArray.push(tag.tag.name)
    })
    if(article) {
        return {article: article, tag: tagArray}
    }
})
