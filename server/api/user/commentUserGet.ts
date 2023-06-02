import { serverSupabaseClient } from "#supabase/server";
import { Database } from "~/types/database.types";

type BodySchema = {
  id: number;
  userId: string;
  articleId: number;
  comment: string;
  date: Date;
  username?: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = serverSupabaseClient<Database>(event);

  const data = await Promise.all(
    body.map(async (item: BodySchema) => {
      let { data: users } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", item.userId);
      if (users) {
        item.username = users[0].username;
      }
      return item;
    })
  );

  return data;
});
