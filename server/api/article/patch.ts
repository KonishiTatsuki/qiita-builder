import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tag, Tagging } from "~/types";

type TagId = {
  id: number;
};

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const body = await readBody(event);
  const stringBody = JSON.stringify(body.postData);
  const reviver = JSON.parse(stringBody);

  //編集した記事を投稿
  await supabase.from("article").upsert(body.postData).eq("id", reviver.id);

  // タグを編集
  body.tag.map(async (tagName: string) => {
    // タグテーブルに既存のものか確認
    const { data: tagId }: PostgrestSingleResponse<TagId[]> = await supabase
      .from("tag")
      .select("id")
      .eq("name", tagName);
    if (tagId !== null && tagId.length > 0) {
      const { data: tagging } = await supabase
        .from("tagging")
        .select("*")
        .match({ articleId: reviver.id, tagId: tagId[0].id });
      //タグが存在していて、タギングテーブルにない状態
      if (tagging?.length === 0) {
        await supabase
          .from("tagging")
          .insert<{ articleId: number; tagId: number }>({
            articleId: reviver.id,
            tagId: tagId[0].id,
          });
        return "新規追加";
      } else {
        // タグが存在していて、タギングテーブルに既にある状態
        return "ok";
      }
    } else {
      // タグが存在しておらず、新規で作る場合
      const { data: newTag }: PostgrestSingleResponse<Tag[]> = await supabase
        .from("tag")
        .insert<Tag>({ name: tagName, display: false })
        .select();
      await supabase
        .from("tagging")
        .insert<Tagging>({ articleId: reviver.id, tagId: tagId[0].id });
      return "新規作成";
    }
  });
});
