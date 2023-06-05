import { serverSupabaseClient } from "#supabase/server";

type BodySchema = {
  publish: boolean,
  publishDate: Date,
  bannerId: Number
};

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient<BodySchema>(event);
  const body = await readBody(event);
  const user = useSupabaseUser();
  const { data } = await supabase
    .from('article')
    .update({ publish: true, publishDate: body.date, bannerId: body.bannerId })
    .eq('id', body.id)
  return data;
});
