import { serverSupabaseClient } from "#supabase/server";

type BodySchema = {
  id: number;
  userId: string;
  articleId: number;
  comment: string;
  date: Date;
  username?: string;
};

type User = {
  id: string;
  username: string;
  clubid: number;
  qiitaToken: string;
  detail: string;
  email: string;
  occupation: number;
  image: null | string;
  authority: boolean;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = serverSupabaseClient<User[]>(event);

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
