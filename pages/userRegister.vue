<template>
  <FormKit
    type="form"
    @submit="submitHandler"
    submit-label="登録する"
    #default="{ value }"
  >
    <div class="h-1/5">
      <div>
        <div>
          <div>
            <h1 class="title">新規登録</h1>
            <div class="mb-2">
              <div>
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                  }"
                  type="text"
                  label=" ユーザ名"
                  name="userName"
                  validation="required|length:0,30|matches:/"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'ユーザ名を入力してください',
                    length: '30文字以内で入力してください',
                  }"
                />
              </div>
            </div>
            <div class="mb-2">
              <div>
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                  }"
                  type="email"
                  label=" メールアドレス"
                  name="email"
                  validation="required|matches:/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/|ends_with:rakus-partners.co.jp"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'メールアドレスを入力してください',
                    matches: '正しいメールアドレスを入力してください',
                    ends_with: 'ラクスのメールアドレスを入力してください',
                  }"
                />
              </div>
            </div>
            <div class="mb-2">
              <div>
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                  }"
                  type="password"
                  label=" パスワード"
                  name="password"
                  validation="required|length:8,30|contains_numeric|contains_lowercase|contains_uppercase"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'パスワードを入力してください',
                    length: '8文字以上30文字以内で入力してください',
                    contains_numeric:
                      '半角英小文字・大文字・数字をそれぞれ1種類以上含んでください',
                    contains_lowercase:
                      '半角英小文字・大文字・数字をそれぞれ1種類以上含んでください',
                    contains_uppercase:
                      '半角英小文字・大文字・数字をそれぞれ1種類以上含んでください',
                  }"
                />
              </div>
            </div>
            <div class="mb-2">
              <div>
                <FormKit
                  :classes="{
                    input: 'border border-black py-1 px-2 rounded-md',
                  }"
                  type="password"
                  label=" パスワード確認用"
                  name="password_confirm"
                  validation="required|confirm"
                  autocomplete="off"
                  :validation-messages="{
                    required: 'パスワードを入力してください',
                    confirm: 'パスワードが一致しません',
                  }"
                />
              </div>
            </div>
          </div>
          <div class="mb-2 flex">
            <FormKit
              :classes="{
                input: 'border border-black py-1 px-2 rounded-md',
              }"
              type="select"
              label="サークル名"
              name="club"
              placeholder="サークル選択"
              validation="required"
              :options="club"
            />
            <FormKit
              :classes="{
                input: 'border border-black  py-1 px-2 rounded-md',
              }"
              type="text"
              label="追加サークル"
              placeholder="その他"
              name="addClub"
              autocomplete="off"
            />
          </div>
          <div class="mb-2">
            <div class="flex">
              <FormKit
                :classes="{
                  wrapper: 'flex',
                  options: 'flex ',
                  option: 'pr-2',
                  decorator: 'none',
                }"
                type="radio"
                label="職種"
                :options="occupation"
                name="occupation"
              />
            </div>
          </div>
          <div class="mb-2">
            <FormKit
              type="file"
              label="アイコン画像"
              accept=".png,.jpeg,.jpg"
              validation="required"
              :validation-messages="画像を選択してください"
            />
          </div>
          <div>
            <div>
              <FormKit
                :classes="{
                  input: 'border border-black  py-1 px-2 rounded-md',
                }"
                type="textarea"
                name="detail"
                label="自己紹介"
                rows="10"
                cols="40"
                validation="required"
                :validation-messages="{
                  required: '自己紹介を入力してください',
                }"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>

      <div class="flex mb-4"></div>
    </div>

    <pre wrap>{{ value }}</pre>
  </FormKit>
</template>

<script setup>
const club = [];
const occupation = [];
const { data: clubb } = await useFetch("/api/club/get");
const { data: occupationn } = await useFetch("/api/occupation/get");
// console.log(occupation);
occupationn.value.map((c) => {
  occupation.push({ label: c.occupationName, value: c.id });
});
clubb.value.map((c) => {
  club.push({ label: c.clubName, value: c.id });
});

const submitHandler = async (credentials) => {
  console.log(credentials);
  const client = useSupabaseClient();

  //追加クラブをdisplay:falseで登録
  const { error } = await client.from("club").insert({
    clubName: credentials.addClub,
  });

  //追加クラブがないときはブルダウンのクラブをpostするための変数
  let clubid = credentials.club;
  // 追加クラブの採番されたIDを取得;
  if (credentials.addClub) {
    const { data: clubid } = await client
      .from("club")
      .select("id")
      .eq("clubName", credentials.addClub);
    console.log(clubid);
  }

  //新規会員登録
  console.log("club", clubid);
  // authに登録;
  await client.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.userName,
        detail: credentials.detail,
        clubid: clubid,
        email: credentials.email,
        occupation: credentials.occupation,
      },
    },
  });

  //authに登録
  // const { data } = useFetch("/api/user/register", {
  //   method: "POST",
  //   body: credentials,
  // });

  console.log("完了");
};
</script>

<!-- await client.auth.signUp({
  email: credentials.email,
    password: credentials.password,
   });
   await client.auth.signInWithPassword({
    email: "madoka.kato@rakus-partners.co.jp",
     password: "Maka7816",
   }); -->
