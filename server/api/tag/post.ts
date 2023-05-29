import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type Tag = {
    id: number,
    name: string,
    display: boolean
}
type Tagging = {
    id: number,
    articleId: number,
    tagId: number
}

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event)

    body.tagArray.map(async(tag: string) => {
    const { data }: PostgrestSingleResponse<Tag[]> = await supabase.from("tag").select("*").eq("name", tag)
  if(data?.length === 0) {
    const { data, error }: PostgrestSingleResponse<Tag[]> = await supabase.from("tag").insert<Tag>({ name: tag, display: false}).select()
    // console.log(data)
    if(data !== null) {
    await supabase.from("tagging").insert<Tagging>({articleId: body.articleId, tagId: data[0].id}).select()
    }
  } else {
    if(data !== null) {
    await supabase.from("tagging").insert<Tagging>({articleId: body.articleId, tagId: data[0].id}).select()

    }
  }
})
return "ok"

})
