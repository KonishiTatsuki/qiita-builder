import { serverSupabaseClient } from "#supabase/server";



export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);
  const user = useSupabaseUser();
  const myObj: { publish: boolean; publishDate: string; bannerId: number; } = {
    publish: true,
    publishDate: '2022-01-01',
    bannerId: 1234
  };
  const { error } = await supabase
    .from('article')
    .update(myObj)
    .eq('id', 1)
});
