<template>
  <h1 class="title">管理者画面</h1>
  <div class="flex items-center">
    <div>バナー表示：</div>
    <div>
      <select name="" id="" class="border border-black" v-model="choseAdvent">
        <option v-for="item in advent" :value="item.id">
          {{ item.adventName }}
        </option>
      </select>
    </div>

    <div class="btn ml-2" @click="registerAdvent">保存</div>
  </div>
  <div class="mt-6 flex items-center">
    <div class="flex">
      <div>アドベントカレンダー：</div>
      <div>
        <div>
          <NuxtLink to="createAdvent"
            ><button class="btn mb-3">新規登録</button></NuxtLink
          >
        </div>
        <div>
          <select
            name=""
            id=""
            class="border border-black"
            v-model="choseEditAdvent"
          >
            <option v-for="item in advent" :value="item.id">
              {{ item.adventName }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex mt-12 ml-2">
      <div>
        <NuxtLink :to="`/editAdvent/${choseEditAdvent}`"
          ><button class="btn" @click="editAdvent">編集</button></NuxtLink
        >
      </div>
    </div>
  </div>
  <div>
    <div>タグ編集：</div>
    <div class="border border-black p-4 w-2/5">
      <div class="flex">
        <div>サークルタグ</div>
        <div>
          <input
            type="text"
            class="border border-black ml-2 p-1"
            v-model="newclub"
          />
        </div>
        <div>
          <button class="ml-2 p-1 btn" @click="addNewClub">追加</button>
        </div>
      </div>
      <div class="mt-3">
        <ul class="flex" v-for="display in nondisplayClub">
          <li>
            <input
              type="radio"
              :value="{ id: `${display.value}`, display: true }"
              v-model="addDisplayClub"
            />
            {{ display.label }}
          </li>
        </ul>
      </div>
      <div class="text-red-500">{{ msgForaddDisplayClub }}</div>
      <div class="flex justify-end">
        <div class="mr-2">
          <button class="btn p-1" @click="deleteClub">削除</button>
        </div>
        <div><button class="btn p-1" @click="addDisplay">表示</button></div>
      </div>
    </div>
  </div>
  <div>
    <div class="mt-3">表示：</div>
    <div class="border border-black p-4 w-2/5">
      <div>サークルタグ</div>
      <div class="mt-3">
        <ul class="flex" v-for="display in displayClub">
          <li>
            <input
              type="checkbox"
              :value="{ id: `${display.value}`, display: false }"
              v-model="addnonDisplayClub"
            />{{ display.label }}
          </li>
        </ul>
      </div>
      <div class="text-red-500">{{ msgForaddnonDisplayClub }}</div>
      <div class="flex justify-end">
        <div class="mr-2">
          <button class="btn p-1" @click="nonDisplay">非表示</button>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-5">
    <div>管理者権限:</div>
    <p>管理者権限を与えたい社員のメールアドレスを入力してください</p>
    <div class="flex items-center">
      <div>
        <input
          type="text"
          class="border border-black"
          maxlength="255"
          v-model="owner"
        />
      </div>
      <div><button class="btn ml-2" @click="submitOwner">保存</button></div>
    </div>
    <p class="text-red-500">{{ errormsg }}</p>
  </div>
  <div class="mt-5">
    <div>管理者一覧：</div>
    <div>
      <table class="border-collapse border border-slate-500 border-spacing-2">
        <tr v-for="item in owners">
          <td class="border border-slate-500 px-2">
            ユーザ名:{{ item.username }}
          </td>
          <td class="border border-slate-500 px-2">{{ item.email }}</td>
          <td class="border border-slate-500 px-2">
            <button class="btn px-2" @click="deleteOwner(item.id)">削除</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Club } from "~/types";
import { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();

const { data: allclub } = await useFetch("/api/club/get");

//アドベントカレンダーのデータ取得
const { data: advent } = await client.from("banner").select("*");

const { data: showAdvent } = useFetch("/api/advent/getAll");

//管理者権限あるユーザの取得
const { data: owners } = await client
  .from("profiles")
  .select("*")
  .eq("authority", true);

//初期表示は現在のアドベントとして保存されているもの
const choseAdvent = ref(`${showAdvent.value?.id}`);

//初期表示は現在のアドベントとして保存されているもの
const choseEditAdvent = ref(`${showAdvent.value?.id}`);

//アドベントカレンダーの保存
const registerAdvent = async () => {
  console.log("aaa", choseAdvent.value);
  //選択したアドベントをtrue
  await client.from("banner").upsert({ id: choseAdvent.value, display: true });
  //初期のアドベントをfalse
  await client
    .from("banner")
    .upsert({ id: showAdvent.value?.id, display: false });
  location.reload();
};

//編集するアドベントの選択
const editAdvent = async () => {
  console.log(choseEditAdvent.value);
};

//display:trueのクラブ
const displayClub: useClub[] = [];
//display:falseのクラブ
const nondisplayClub: useClub[] = [];

//新規追加クラブ
const newclub = ref("");

const addDisplayClub = ref([]);
const msgForaddDisplayClub = ref();
const msgForaddnonDisplayClub = ref();
const addnonDisplayClub = ref([]);

type useClub = {
  label: string;
  value: number;
};

allclub.value?.map((club: Club) => {
  if (club.display) {
    displayClub.push({ value: club.id, label: club.clubName });
  } else {
    nondisplayClub.push({ value: club.id, label: club.clubName });
  }
});

//表示するサークルの追加
const addDisplay = async () => {
  if (addDisplayClub.value.length === 0) {
    msgForaddDisplayClub.value = "少なくとも一つ選択してください";
  } else {
    console.log(addDisplayClub.value);
    const { error } = await client.from("club").upsert(addDisplayClub.value);
    location.reload();
  }
};

//サークルを非表示にする
const nonDisplay = async () => {
  if (addnonDisplayClub.value.length === 0) {
    msgForaddnonDisplayClub.value = "少なくとも一つ選択してください";
  } else {
    const { error } = await client.from("club").upsert(addnonDisplayClub.value);
    location.reload();
  }
};

type deleteClub = { id: number };

//表示するサークルの削除
const deleteClub = async () => {
  //削除するサークルの配列
  const clubId: deleteClub[] = [];
  addDisplayClub.value.map((club: { id: number }) => {
    clubId.push({ id: club.id });
  });
  let errorNumber = [];
  clubId.map(async (club) => {
    const { error } = await client.from("club").delete().eq("id", club.id);
    console.log(error);
    if (error) {
      console.log(error.details.substring(10, 13));
      errorNumber.push(error.details.substring(10, 13));
      // msgForaddDisplayClub.value = "削除できません";
    }
  });
  await new Promise((r) => setTimeout(r, 1000));

  // location.reload();
};

//新規クラブの追加
const addNewClub = async () => {
  if (!newclub.value) {
    msgForaddDisplayClub.value = "追加するクラブを入力してください";
  } else {
    const { error: cluberror } = await client.from("club").insert({
      clubName: newclub.value,
    });
    location.reload();
  }
};

//エラーメッセージ
const errormsg = ref("");

//新規管理者権限
const owner = ref("");
//新規管理者の保存
const submitOwner = async () => {
  errormsg.value = "";
  const re = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@rakus-partners.co.jp/;
  if (!owner.value) {
    errormsg.value = "メールアドレスを入力してください";
  } else {
    //ラクスメールアドレス形式のバリデーション
    if (re.test(owner.value)) {
      const { data, error } = await client
        .from("profiles")
        .update({ authority: true })
        .eq("email", owner.value)
        .select();
      if (data && data.length > 0) {
        console.log("完了");
        location.reload();
      } else if (data && data.length === 0) {
        errormsg.value = "該当のメールアドレスが見つかりません";
      }
    } else {
      errormsg.value = "ラクスメールアドレスの形式で入力してください";
    }
  }
};

//owner権限の削除
const deleteOwner = async (id: number) => {
  const { data, error } = await client
    .from("profiles")
    .upsert({ id: id, authority: false });
  location.reload();
};
</script>
