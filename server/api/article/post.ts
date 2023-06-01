import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Article, Tag, Tagging } from "~/types";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const body = await readBody(event);

  //記事の投稿
  const { data: article, error }: PostgrestSingleResponse<Article[]> =
    await supabase.from("article").insert(body.article).select();

  //成功すればタグの生成
  if (article) {
    body.tagArray.map(async (tag: string) => {
      const { data }: PostgrestSingleResponse<Tag[]> = await supabase
        .from("tag")
        .select("*")
        .eq("name", tag);
      //既存のタグがない場合、作成
      if (data?.length === 0) {
        const { data, error }: PostgrestSingleResponse<Tag[]> = await supabase
          .from("tag")
          .insert<Tag>({ name: tag, display: false })
          .select();
        if (data !== null) {
          await supabase
            .from("tagging")
            .insert<Tagging>({ articleId: article[0].id, tagId: data[0].id })
            .select();
        }
        //既存のタグがある場合は、タギングテーブルのみにpost
      } else {
        if (data !== null) {
          await supabase
            .from("tagging")
            .insert<Tagging>({ articleId: article[0].id, tagId: data[0].id })
            .select();
        }
      }
    });
    return "ok";
  }
});
