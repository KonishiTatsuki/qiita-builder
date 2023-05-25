import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseClient(event);

  const body = await readBody(event);
  console.log(body.addClub);

  // 新サークルを保存
  await supabase.from("club").insert({
    clubName: body.addClub,
    display: false,
  });

  //authに登録
  // const { error } = await client.auth.signUp({
  //   email: body.email,
  //   password: body.password,
  //   options: {
  //     data: {
  //       username: body.userName,
  //       clubid: body.club,
  //       addClub: body.addClub,
  //       email: body.email,
  //       occupation: body.occupation,
  //       detail: body.detail,
  //     },
  //   },
  // });

  // await client.from.('user').insert({
  //   userName: body.userName,
  //   email: body.email,
  //   password: body.password,
  //   clubId:body.clubId,
  //   addclub:body.addclub,
  //   occupationId:
  // });

  return "aaa";
});
