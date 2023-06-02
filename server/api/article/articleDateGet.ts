import { serverSupabaseClient } from "#supabase/server";
// import { Article } from "~/types";

type BodySchema = {
  id: number;
  userId: string;
  date: Date;
  title: string;
  clubTagId: null|number;
  occupationTagId: number;
  body: string;
  goalLike: number;
  qiitaPost: boolean;
  publishDate: string;
  publish: boolean;
  bannerId: null|number;
  delete: boolean;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient<BodySchema>(event);
  const { data } = await spabase.from("article").select("*").eq("id", body);
  console.log("data123", data);
  return data;
});
