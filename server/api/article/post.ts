import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Article, Tag, Tagging } from "~/types";
import { Database } from "~/types/database.types";

type TagInsert = {
  name: string;
  display: boolean;
};

type TaggingInsert = {
  articleId: number;
  tagId: number;
};

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<Database>(event);
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
          .insert<TagInsert>({ name: tag, display: false })
          .select();
        if (data !== null) {
          await supabase
            .from("tagging")
            .insert<TaggingInsert>({
              articleId: article[0].id,
              tagId: data[0].id,
            })
            .select();
        }
        //既存のタグがある場合は、タギングテーブルのみにpost
      } else {
        if (data !== null) {
          await supabase
            .from("tagging")
            .insert<TaggingInsert>({
              articleId: article[0].id,
              tagId: data[0].id,
            })
            .select();
        }
      }
    });
    return "ok";
  }
});
