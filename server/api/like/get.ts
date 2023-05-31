import { serverSupabaseClient } from "#supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

type ArticleId = {
  articleId: number;
};

type ArticleTitle = {
  title: string;
};

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const query = getQuery(event);
  const queryString = JSON.stringify(query.userId);
  const queryNumber = JSON.parse(queryString);
  let articleArray = [];

  const { data: articleId }: PostgrestSingleResponse<ArticleId[]> =
    await supabase.from("like").select("articleId").eq("userId", queryNumber);

  if (articleId !== null && articleId.length > 0) {
    const articleTitlePromises = articleId.map(async (id) => {
      const { data: articleTitle }: PostgrestSingleResponse<ArticleTitle[]> =
        await supabase.from("article").select("title").eq("id", id.articleId);
      if (articleTitle !== null && articleTitle.length > 0) {
        return articleTitle.map((title) => ({
          id: id.articleId,
          title: title.title,
        }));
      } else {
        // 空の配列を返すことで、結果がない場合も結合処理ができるようにする
        return [];
      }
    });

    const resolvedArticleTitles = await Promise.all(articleTitlePromises);
    articleArray = resolvedArticleTitles.reduce(
      (acc, titles) => acc.concat(titles),
      []
    );
  } else {
    return "No data";
  }

  return articleArray;
});
