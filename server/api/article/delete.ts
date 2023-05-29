import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event)
    await supabase.from('article').update({delete: true}).eq("id", body)
    return "ok"
})
