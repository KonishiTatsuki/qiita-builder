import { serverSupabaseClient } from "#supabase/server";

type Profile = {
  id: string;
  username: string;
  clubid: {
    id: number;
    display: boolean;
    clubName: string;
  };
  qiitaToken: string;
  detail: string;
  email: string;
  occupation: {
    id: number;
    occupationName: string;
  };
  image: string;
  authority: boolean;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = serverSupabaseClient(event);
  const { data } = await client
    .from("profiles")
    .select("*,clubid(*),occupation(*)")
    .eq("id", body);
  if (data) {
    const userData: Profile = data[0];
    return userData;
  }
});
