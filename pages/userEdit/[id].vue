<template>
  <div v-if="data" class="max-w-[1200px] mx-auto mt-32 main">
    <div class="border border-black m-4 max-w-[1200px]">
      <div class="ml-6 flex">
        <div>
          <FormKit
            type="form"
            @submit="submitHandler"
            #default="{ value }"
            id="edit"
            :actions="false"
          >
            <div>
              <div class="flex w-[800px]">
                <div class="w-5/6">
                  <h1 class="title">ユーザ情報</h1>
                  <div class="flex mb-3">
                    <span class="font-bold"> ユーザー名 </span>
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
                        :value="data[0].username"
                      />
                    </div>
                    <div v-else class="ml-8">
                      {{ data[0].username }}
                    </div>
                  </div>
                  <div class="flex mb-3">
                    <span class="font-bold"> メールアドレス </span>
                    <div class="ml-1">
                      <p>{{ data[0].email }}</p>
                    </div>
                  </div>
                  <div class="flex mb-3">
                    <span class="font-bold"> 職種 </span>
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
                        :value="data[0].occupation.id"
                      />
                    </div>
                    <div v-else class="ml-20">
                      <p>{{ data[0].occupation.occupationName }}</p>
                    </div>
                  </div>
                  <div class="flex mb-3">
                    <span class="font-bold"> サークル </span>
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
                        @input="selectClub"
                        :validation-messages="{
                          required:
                            'サークルを選択してください(該当するものがない場合はその他を選択)',
                        }"
                        :value="data[0].clubid.id"
                      />
                      <!-- 追加した内容 -->
                      <div v-show="othersClub">
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
                      <!-- 追加した内容 -->
                    </div>
                    <div v-else class="ml-12">
                      <div v-if="data[0].clubid">
                        {{ data[0].clubid.clubName }}
                        <span v-if="!data[0].clubid.display"
                          >(未認証クラブ)</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="flex mb-3">
                    <span class="font-bold whitespace-nowrap"> 自己紹介 </span>
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
                        validation="length:0,255"
                        :validation-messages="{
                          length: '255文字以内で入力してください',
                        }"
                        :value="data[0].detail"
                      />
                    </div>
                    <div v-else class="ml-12">
                      <div style="width: 500px; word-wrap: break-word">
                        {{ data[0].detail }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FormKit>

          <button class="btn ml-7" v-show="editbool" @click="editComp">
            保存
          </button>
        </div>

        <div class="mt-3">
          <div class="mt-24">
            <div v-if="avatarImage !== 'null'">
              <img
                :src="avatarImage"
                alt="アイコン"
                class="w-32 h-32 rounded-full ml-6"
              />
            </div>
          </div>
          <FormKit
            type="form"
            @submit="iconsubmit"
            #default="{ value }"
            id="register"
            :actions="false"
          >
            <div v-show="iconeditbool" class="ml-8">
              <FormKit
                :classes="{
                  message: 'text-red-500',
                  noFiles: 'text-transparent',
                  inner: 'mt-5',
                }"
                type="file"
                name="file"
                accept=".png,.jpeg,.jpg"
                validation="required"
                :validation-messages="{
                  required: '画像を選択してください',
                }"
                @input="setImage"
              />
            </div>
            <button class="btn" v-show="iconeditbool">
              アイコンを保存する
            </button>
          </FormKit>
          <button class="btn mt-5" v-show="!iconeditbool" @click="iconedit">
            アイコンを編集する
          </button>
        </div>
      </div>

      <div class="flex m-3 p-3">
        <button class="btn mr-2" @click="edit" v-show="!editbool">
          編集する
        </button>
        <NuxtLink to="/passwordReset"
          ><button class="btn">パスワードを変更する</button></NuxtLink
        >
      </div>
    </div>
    <div
      class="border border-black m-4 p-3 flex items-center space-x-2 max-w-[1200px]"
    >
      <p v-if="data[0].qiitaToken" class="m-3">QiitaToken：連携済み</p>
      <NuxtLink to="/qiitaCoordination">
        <button class="btn m-3">Qiitaと連携する</button></NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { submitForm } from "@formkit/core";
import { Club, Occupation } from "~/types";
import { Database } from "~/types/database.types";

const users = useSupabaseUser();
const userId = users.value?.id;

type useClub = {
  label: string;
  value: number;
};

type useOccupation = {
  label: string;
  value: number;
};
const client = useSupabaseClient<Database>();
const route = useRoute();
let data = ref([]);
await client
  .from("profiles")
  .select("*,clubid(*),occupation(*)")
  .eq("id", route.params.id)
  .then((response) => {
    data.value = response.data;
    console.log(data.value);
  })
  .catch((error) => {
    console.error(error);
  });
const occupation: useOccupation[] = [];
const defaultClub = ref();
// const club: useClub[] = [];
// 追加した内容
const club: useClub[] = [{ label: "その他", value: 0 }];
// 追加した内容

const avatarImage = ref(`${data.value[0].image}`);
// console.log(avatarImage);
const editbool = ref(false);
const iconeditbool = ref(false);
const othersClub = ref(false);

// 追加した内容
const selectClub = (credentials) => {
  if (credentials === 0) {
    othersClub.value = true;
  } else {
    othersClub.value = false;
  }
};
// 追加した内容

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

if (data.value[0].clubid) {
  defaultClub.value = data.value[0].clubid.id;
}

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

const setImage = (credentials) => {
  console.log(credentials);
  const fileImg = credentials[0].file;
  avatarImage.value = URL.createObjectURL(fileImg);
};

const iconsubmit = async (credentials: Credentials) => {
  const file = credentials.file[0].file; // 選択された画像を取得
  const random = Math.random().toString(32).substring(2);
  console.log(`${random}`);
  const filePath = userId + random;
  console.log(filePath);
  await client.storage.from("avatars").upload(filePath, file);

  const { data } = client.storage.from("avatars").getPublicUrl(filePath);
  const imageUrl = data.publicUrl;
  const { error } = await client.from("profiles").upsert({
    id: route.params.id,
    image: imageUrl,
  });
  // location.reload();
  iconeditbool.value = !iconeditbool.value;
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
  // console.log(error);
  // if (!error.value) {
  //   location.reload();
  // }
  editbool.value = !editbool.value;
};

const edit = () => {
  editbool.value = !editbool.value;
};

import { createClient } from "@supabase/supabase-js";
const runtimeConfig = useRuntimeConfig();
//supabaseのurlとkeyを使ってcreateClientを作成
const supabase1 = createClient(
  runtimeConfig.public.supabase.url,
  runtimeConfig.public.supabase.key
);

supabase1
  .channel("table-db-changes") // 任意のチャンネル名
  .on(
    "postgres_changes",
    {
      event: "*", // "INSERT" | "UPDATE" | "DELETE" のように特定イベントだけの購読も可能
      schema: "public",
      table: "profiles",
    },
    async (payload) => {
      console.log(payload);
      const { data: d } = await client
        .from("profiles")
        .select("*,clubid(*),occupation(*)")
        .eq("id", route.params.id);
      data.value = d;
    }
  )
  .subscribe();
</script>
