<template>
  <FormKit
    type="form"
    @submit="submitHandler"
    #default="{ value }"
    id="register"
    :actions="false"
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
                    message: 'text-red-500',
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
                    message: 'text-red-500',
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
                    message: 'text-red-500',
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
                    message: 'text-red-500',
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
                message: 'text-red-500',
              }"
              type="select"
              label="サークル名"
              name="club"
              placeholder="サークル選択"
              validation="required"
              :options="club"
              :validation-messages="{
                required:
                  'サークルを選択してください(該当するものがない場合はその他を選択)',
              }"
            />
            <FormKit
              :classes="{
                input: 'border border-black  py-1 px-2 rounded-md',
                message: 'text-red-500',
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
                  message: 'text-red-500',
                }"
                type="radio"
                label="職種"
                :options="occupation"
                name="occupation"
                validation="required"
                :validation-messages="{
                  required: '職種を選択してください',
                }"
              />
            </div>
          </div>
          <div class="mb-2">
            <FormKit
              :classes="{
                message: 'text-red-500',
              }"
              type="file"
              name="file"
              label="アイコン画像"
              accept=".png,.jpeg,.jpg"
              validation="required"
              :validation-messages="{
                required: '画像を選択してください',
              }"
            />
          </div>
          <div>
            <div>
              <FormKit
                :classes="{
                  input: 'border border-black  py-1 px-2 rounded-md',
                  message: 'text-red-500',
                }"
                type="textarea"
                name="detail"
                label="自己紹介"
                rows="10"
                cols="40"
                validation="required|length:0,255"
                :validation-messages="{
                  required: '自己紹介を入力してください',
                  length: '255文字以内で入力してください',
                }"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>

      <div class="flex mb-4">
        <button class="btn">登録する</button>
        <p>{{ errormesssage }}</p>
      </div>
    </div>

    <!-- <pre wrap>{{ value }}</pre> -->
  </FormKit>
</template>

<script setup>
const errormesssage = ref("");
const club = [{ label: "その他(右フォームに記入)", value: "others" }];
const occupation = [];
const { data: clubb } = await useFetch("/api/club/get");
const { data: occupationn } = await useFetch("/api/occupation/get");

occupationn.value.map((c) => {
  occupation.push({ label: c.occupationName, value: c.id });
});
clubb.value.map((c) => {
  club.push({ label: c.clubName, value: c.id });
});

//登録する押下
const submitHandler = async (credentials) => {
  console.log(credentials);
  const client = useSupabaseClient();

  //追加クラブがないときはブルダウンのクラブをpostするための変数
  let clubid = credentials.club;

  // 追加クラブの登録と取得
  if (credentials.addClub) {
    //追加クラブをdisplay:falseで登録
    const { error: cluberror } = await client.from("club").insert({
      clubName: credentials.addClub,
    });
    const { data } = await client
      .from("club")
      .select("id")
      .eq("clubName", credentials.addClub);

    clubid = data[0].id;
  }

  //アイコン画像を保存
  console.log(credentials.file[0].file);
  const file = credentials.file[0].file; // 選択された画像を取得
  const filePath = `${credentials.file[0].name}`; // 画像の保存先のpathを指定
  const { error: avatarerror } = await client.storage
    .from("avatars")
    .upload(filePath, file);
  // console.log("avatarerror", avatarerror);
  // 画像のURLを取得
  if (!avatarerror) {
    const { data } = client.storage.from("avatars").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;
    // console.log("url", imageUrl);

    //新規会員登録
    // authに登録;
    const { error } = await client.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          username: credentials.userName,
          detail: credentials.detail,
          clubid: clubid,
          email: credentials.email,
          occupation: credentials.occupation,
          image: imageUrl,
        },
      },
    });
    if (!error) {
      //ログインする
      const { data } = await client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      if (data.session) {
        location.href = "/";
      }
    } else {
      errormesssage.value = "既に登録されているメールアドレスです";
    }
    console.log("error", error);
  } else {
    errormesssage.value = "アバター画像名が既に重複しています。";
  }

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
