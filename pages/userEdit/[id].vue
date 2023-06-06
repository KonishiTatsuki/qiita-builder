<template>
  <!-- {{ $route.params.id }} -->
  <div v-if="data">
    <div class="border border-black m-4">
      <div class="flex mt-3">
        <div>
          <FormKit
            type="form"
            @submit="submitHandler"
            #default="{ value }"
            id="edit"
            :actions="false"
          >
            <div class="m-3 p-3 flex">
              <div>
                <h1 class="title">ユーザ情報</h1>
                <div class="flex mb-3">
                  ユーザー名:
                  <div v-if="editbool">
                    <FormKit
                      :classes="{
                        input: 'border border-black py-1 px-2 rounded-md',
                        message: 'text-red-500',
                      }"
                      type="text"
                      name="userName"
                      validation="required|length:0,30|matches:/"
                      autocomplete="off"
                      :validation-messages="{
                        required: 'ユーザ名を入力してください',
                        length: '30文字以内で入力してください',
                      }"
                      :value="data.username"
                    />
                  </div>
                  <div v-if="!editbool">
                    {{ data.username }}
                  </div>
                </div>
                <div class="flex mb-3">
                  メールアドレス：
                  <div>
                    <p>{{ data.email }}</p>
                  </div>
                </div>
                <div class="flex mb-3">
                  職種:
                  <div v-if="editbool">
                    <FormKit
                      :classes="{
                        wrapper: 'flex',
                        options: 'flex ',
                        option: 'pr-2',
                        decorator: 'none',
                        message: 'text-red-500',
                      }"
                      type="radio"
                      :options="occupation"
                      name="occupation"
                      validation="required"
                      :validation-messages="{
                        required: '職種を選択してください',
                      }"
                      :value="data.occupation.id"
                    />
                  </div>
                  <div v-else>
                    <p>{{ data.occupation.occupationName }}</p>
                  </div>
                </div>
                <div class="flex mb-3">
                  サークル:
                  <div v-if="editbool">
                    <FormKit
                      :classes="{
                        input: 'border border-black py-1 px-2 rounded-md',
                        message: 'text-red-500',
                      }"
                      type="select"
                      name="club"
                      placeholder="サークル選択"
                      validation="required"
                      :options="club"
                      :validation-messages="{
                        required:
                          'サークルを選択してください(該当するものがない場合はその他を選択)',
                      }"
                      :value="data.clubid.id"
                    />
                    <!-- <FormKit
                      :classes="{
                        input: 'border border-black  py-1 px-2 rounded-md',
                        message: 'text-red-500',
                      }"
                      type="text"
                      label="追加サークル"
                      placeholder="その他"
                      name="addClub"
                      autocomplete="off"
                    /> -->
                  </div>
                  <p v-else>{{ data.clubid.clubName }}</p>
                </div>
                <div>
                  自己紹介:
                  <div v-if="editbool">
                    <FormKit
                      :classes="{
                        input: 'border border-black  py-1 px-2 rounded-md',
                        message: 'text-red-500',
                      }"
                      type="textarea"
                      name="detail"
                      rows="10"
                      cols="40"
                      validation="required|length:0,255"
                      :validation-messages="{
                        required: '自己紹介を入力してください',
                        length: '255文字以内で入力してください',
                      }"
                      :value="data.detail"
                    />
                  </div>
                  <div v-else>
                    <p>{{ data.detail }}</p>
                  </div>
                </div>
              </div>
              <div>
                <div v-show="!iconeditbool" class="rounded-lg ml-20 mt-24">
                  <div>
                    <img
                      :src="data.image"
                      alt="アイコン"
                      class="w-48 h-48 rounded-full mr-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FormKit>
          <button class="btn ml-7" v-show="editbool" @click="editComp">
            保存
          </button>
        </div>
        <div class="mt-12">
          <FormKit
            type="form"
            @submit="iconsubmit"
            #default="{ value }"
            id="register"
            :actions="false"
          >
            <div v-show="iconeditbool" class="mt-44 ml-8">
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
            <button class="btn mr-2 mt-8 ml-6" v-show="iconeditbool">
              アイコンを保存する
            </button>
          </FormKit>
          <button
            class="btn mr-2 mt-56"
            v-show="!iconeditbool"
            @click="iconedit"
          >
            アイコン編集する
          </button>
        </div>
      </div>
      <div class="flex m-3 p-3">
        <button class="btn mr-2" @click="edit" v-show="!editbool">
          編集する
        </button>
        <NuxtLink to="/passwordForget"
          ><button class="btn">パスワードを変更する</button></NuxtLink
        >
      </div>
    </div>
    <div class="border border-black m-4 p-3 flex">
      QiitaToken:
      <p v-if="data.qiitaToken">連携済み</p>
      <NuxtLink to="/qiitaCoordination">
        <button class="btn">Qiitaと連携する</button></NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { submitForm } from "@formkit/core";

import { Club, Occupation } from "~/types";
import { Database } from "~/types/database.types";

type useClub = {
  label: string;
  value: number;
};

type useOccupation = {
  label: string;
  value: number;
};
const occupation: useOccupation[] = [];
const route = useRoute();
const router = useRouter();
const club: useClub[] = [];
const client = useSupabaseClient<Database>();
//profile取得
const { data } = useFetch("/api/user/get", {
  method: "POST",
  body: route.params.id,
});

const editbool = ref(false);
const iconeditbool = ref(false);

const { data: clubb } = await useFetch("/api/club/get");
const { data: occupationn } = await useFetch("/api/occupation/get");

occupationn.value?.map((c: Occupation) => {
  occupation.push({ label: c.occupationName, value: c.id });
});
clubb.value?.map((c: Club) => {
  club.push({ label: c.clubName, value: c.id });
});

const iconedit = () => {
  iconeditbool.value = !iconeditbool.value;
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
  id: string;
};

const iconsubmit = async (credentials: Credentials) => {
  console.log(iconsubmit);
  const file = credentials.file[0].file; // 選択された画像を取得
  const filePath = `${credentials.file[0].name}`; // 画像の保存先のpathを指定
  const { error: avatarerror } = await client.storage
    .from("avatars")
    .upload(filePath, file);
  if (!avatarerror) {
    const { data } = client.storage.from("avatars").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;
    const { error } = await client.from("profiles").upsert({
      id: route.params.id,
      image: imageUrl,
    });
    location.reload();
  } else {
    console.log(avatarerror);
  }
};

const editComp = () => {
  submitForm("edit");
};

const submitHandler = async (credentials: Credentials) => {
  credentials.id = String(route.params.id);

  const { error } = await useFetch("/api/user/edit", {
    method: "POST",
    body: credentials,
  });
  console.log(error);
  if (!error.value) {
    // editbool.value = !editbool.value;
    location.reload();
  }
};

const edit = () => {
  editbool.value = !editbool.value;
};
</script>

<!-- // let userData = {
  //   username: "",
  //   id: "",
  //   clubid: { id: 0, clubName: "" },
  //   qiitaToken: "",
  //   detail: "",
  //   email: "",
  //   occupation: { id: 0, occupationName: "" },
  //   image: "",
  //   authority: false,
  // };
  
  // if (data.value !== null) {
  //   userData = data.value;
  // } -->
