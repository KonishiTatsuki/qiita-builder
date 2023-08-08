import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = serverSupabaseClient(event);
  console.log("body", body);
  try {
    const { data, error } = await supabase
      .from("recommend")
      .insert({ userId: body.userId, articleId: body.articleId });
      // .insert({ userId: body.userId, articleId: body.articleId });
    console.log("data", data);
    console.log("error", error);
    return data;
  } catch (error) {
    console.error("エラーが発生しました:", error);
    return null; // エラーが発生した場合はnullを返す（必要に応じて適切なエラーハンドリングを行う）
  }
});
