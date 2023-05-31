import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const spabase = serverSupabaseClient(event);
  let tagNames = [];

  for (const tag of body) {
    PageTransitionEvent;
    const { data: tags } = await spabase
      .from("tag")
      .select("name")
      .eq("id", tag.tagId);
    if (tags?.length > 0) {
      tagNames.push(tags[0].name);
    }
  }
  return tagNames;
});
