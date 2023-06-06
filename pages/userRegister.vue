<template>
  <div class="flex justify-center">
    <div>
      <FormKit
        type="form"
        @submit="submitHandler"
        #default="{ value }"
        id="register"
        :actions="false"
        incomplete-message=" "
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
          </div>
          <p>{{ errormesssage }}</p>
        </div>
      </FormKit>
      <div class="flex mb-4 justify-center mt-4">
        <button class="btn" @click="submitRegister">登録する</button>
        <button class="btn" @click="connectQitta">
          登録してQiitaを連携する
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { submitForm } from "@formkit/core";
import { Occupation, Club } from "~/types";
import { Database } from "~/types/database.types";
type useClub = {
  label: string;
  value: number;
};

type useOccupation = {
  label: string;
  value: number;
};
const errormesssage = ref("");
const club: useClub[] = [{ label: "その他(右フォームに記入)", value: 0 }];
const occupation: useOccupation[] = [];
const { data: clubb } = await useFetch("/api/club/get");
const { data: occupationn } = await useFetch("/api/occupation/get");
const router = useRouter();
const succes = ref(false);
occupationn.value?.map((c: Occupation) => {
  occupation.push({ label: c.occupationName, value: c.id });
});
clubb.value?.map((c: Club) => {
  club.push({ label: c.clubName, value: c.id });
});
const client = useSupabaseClient<Database>();

//登録する押下
const submitRegister = async () => {
  submitForm("register");
  await new Promise((r) => setTimeout(r, 1500));
  if (succes.value) {
    router.push("/");
  }
  console.log("トップへ遷移", succes.value);
};

//qiitta連携
const connectQitta = async () => {
  submitForm("register");
  await new Promise((r) => setTimeout(r, 1500));
  if (succes.value) {
    router.push("/qiitaCoordination");
  }
};

type Credentials = {
  userName: string;
  club: number;
  detail: string;
  email: string;
  occupation: number;
  image: string;
  password: string;
  password_confirm: string;
  addClub: string;
  file: any;
};

//supabaseへのデータ保存
const submitHandler = async (credentials: Credentials) => {
  console.log(credentials);
  let clubId = credentials.club;

  //アイコン画像を保存
  const file = credentials.file[0].file; // 選択された画像を取得
  const filePath = `${credentials.file[0].name}`; // 画像の保存先のpathを指定
  const { error: avatarerror } = await client.storage
    .from("avatars")
    .upload(filePath, file);
  console.log(avatarerror);

  if (avatarerror) {
    if (avatarerror.message === " 'The resource already exists'") {
      errormesssage.value = "画像が重複しています";
    } else if (
      avatarerror.message === "The object name contains invalid characters"
    ) {
      errormesssage.value = "画像のファイル名が不適切です。";
    }
  } else {
    if (credentials.addClub) {
      //追加クラブをdisplay:falseで登録
      await client.from("club").insert({
        clubName: credentials.addClub,
      });
      const { data } = await client
        .from("club")
        .select("id")
        .eq("clubName", credentials.addClub);

      if (data !== null) {
        clubId = data[0].id;
      }
    }
  }
  const { data } = client.storage.from("avatars").getPublicUrl(filePath);
  const imageUrl = data.publicUrl;
  //新規会員登録
  // authに登録;
  const { error } = await client.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.userName,
        detail: credentials.detail,
        clubid: clubId,
        email: credentials.email,
        occupation: credentials.occupation,
        image: imageUrl,
      },
    },
  });
  succes.value = true;
  if (error) {
    errormesssage.value = "既に登録されているメールアドレスです。";
  }
};
</script>
