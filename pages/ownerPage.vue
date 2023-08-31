<template>
  <div class="main">
    <h1 class="title">管理者画面</h1>
    <div class="flex items-center my-16">
      <div class="w-1/5">バナー表示：</div>
      <div class="w-4/5">
        <select
          name=""
          id=""
          class="border border-black w-80"
          v-model="choseAdvent"
        >
          <option v-for="item in advent" :value="item.id">
            {{ item.adventName }}
          </option>
        </select>
        <span class="btn ml-4" @click="registerAdvent">保存</span>
      </div>
    </div>

    <!-- アドベントカレンダー -->
    <div class="my-16 flex items-center">
      <div class="w-1/5">アドベントカレンダー：</div>
      <div class="flex">
        <div class="w-4/5">
          <div>
            <NuxtLink to="createAdvent"
              ><button class="btn mb-3">新規登録</button></NuxtLink
            >
          </div>
          <div class="mt-3">
            <select
              name="choseAdvent"
              id="choseAdvent"
              class="border border-black w-80"
              v-model="choseEditAdvent"
            >
              <option v-for="item in advent" :value="item.id">
                {{ item.adventName }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex mt-12 ml-4">
        <div>
          <NuxtLink :to="`/editAdvent/${choseEditAdvent}`"
            ><button class="btn" @click="editAdvent">編集</button></NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- タグ編集 -->
    <div class="flex my-20">
      <div class="w-1/5">タグ編集：</div>
      <div class="w-4/5 flex">
        <div class="border border-black p-4 min-w-[420px] mr-2">
          <p class="font-bold">認証済みサークルタグ</p>
          <hr />
          <div class="mt-6">
            <ul>
              <li v-for="display in displayClub" class="flex">
                <input
                  type="radio"
                  :value="{ id: `${display.value}` }"
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
        <div class="border border-black p-4 min-w-[420px] ml-2">
          <p class="font-bold">未認証サークルタグ</p>
          <hr />
          <div class="flex mt-6">
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
          <div class="text-red-500 m-2">{{ msgForaddClub }}</div>
          <div class="mt-3">
            <ul>
              <li v-for="display in nondisplayClub" class="flex">
                <input
                  type="radio"
                  :value="{ id: `${display.value}` }"
                  v-model="addDisplayClub"
                />
                {{ display.label }}
              </li>
            </ul>
          </div>
          <div class="text-red-500">{{ msgForaddDisplayClub }}</div>
          <div class="text-red-500">{{ msgForDeleteClub }}</div>
          <div class="flex justify-end">
            <div class="mr-2">
              <button class="btn p-1" @click="displayModalDeleteClub">
                削除
              </button>
            </div>
            <Teleport to="body">
              <div v-if="clubModal" class="modal">
                <div class="modal-content">
                  <p class="mb-5">本当に削除しますか？</p>
                  <button @click="clubModal = false" class="btn mr-5">
                    No
                  </button>
                  <button @click="deleteClub" class="btn">Yes</button>
                </div>
              </div>
            </Teleport>
            <div><button class="btn p-1" @click="addDisplay">表示</button></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 管理者権限  -->
    <div class="mt-5 flex my-16">
      <div class="w-1/5">管理者権限：</div>
      <div class="w-4/5">
        <p class="mb-3">
          管理者権限を与えたい社員のメールアドレスを入力してください
        </p>
        <div class="flex items-center">
          <div>
            <input
              type="text"
              class="border border-black w-80"
              maxlength="255"
              v-model="owner"
            />
          </div>
          <div><button class="btn ml-4" @click="submitOwner">保存</button></div>
        </div>
        <p class="text-red-500">{{ errormsg }}</p>
        <div class="mt-5">
          <div>
            <table
              class="border-collapse border border-slate-500 border-spacing-2 my-12"
            >
              <thead>
                <tr>
                  <th colspan="3">管理者一覧</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in ownerList">
                  <td class="border border-slate-500 px-2 max w-[400px]">
                    ユーザ名：{{ item.username }}
                  </td>
                  <td class="border border-slate-500 px-2 max w-[400px]">
                    {{ item.email }}
                  </td>
                  <td class="border border-slate-500 px-2 w-[70px]">
                    <button
                      class="btn px-2"
                      @click="(open = true), (deleteItem = item.id)"
                    >
                      削除
                    </button>
                  </td>
                  <Teleport to="body">
                    <div v-if="open" class="modal">
                      <div class="modal-content">
                        <p class="mb-5">本当に削除しますか？</p>
                        <button @click="open = false" class="btn mr-5">
                          No
                        </button>
                        <button @click="deleteOwner(deleteItem)" class="btn">
                          Yes
                        </button>
                      </div>
                    </div>
                  </Teleport>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ユーザーの削除 -->
    <div class="mt-5 flex my-16">
      <div class="w-1/5">登録ユーザーの削除：</div>
      <div class="w-4/5">
        <p class="mb-3">
          ユーザー情報を削除したい社員のメールアドレスを入力してください
        </p>
        <div class="flex items-center">
          <div>
            <input
              type="text"
              class="border border-black w-80"
              maxlength="255"
              v-model="deleteUser"
            />
          </div>
          <div>
            <button class="btn ml-4" @click="userDeletingValidation()">
              削除
            </button>
          </div>
        </div>
        <p class="text-red-500">{{ userDeleteErrormsg }}</p>
        <Teleport to="body">
          <div v-if="deleteUserModal" class="modal">
            <div class="modal-content">
              <p class="mb-5">本当に削除しますか？</p>
              <button @click="deleteUserModal = false" class="btn mr-5">
                No
              </button>
              <button @click="deleteUserRegistration()" class="btn">Yes</button>
            </div>
          </div>
        </Teleport>
        <Teleport to="body">
          <div v-if="deleteCompleteModal" class="modal">
            <div class="modal-content">
              <p class="mb-5">削除が完了しました</p>
              <p class="mb-5 text-xs">画面を再読み込みします</p>
            </div>
          </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Club, Profile } from "~/types";
import { Database } from "~/types/database.types";
import { createClient } from "@supabase/supabase-js";
import newClub from "~/server/api/club/newClub";

const runtimeConfig = useRuntimeConfig();
const supabase = createClient(
  runtimeConfig.public.supabase.url,
  runtimeConfig.public.supabase.key
);

useHead({
  title: "管理者画面",
});

// clubテーブルのリアルタイム
const clubChannel = supabase
  .channel("table-db-club")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "club",
    },
    async (payload) => {
      const { data: allclub } = await useFetch("/api/club/get");
      displayClub.splice(0, displayClub.length);
      nondisplayClub.splice(0, nondisplayClub.length);

      allclub.value?.map((club: Club) => {
        if (club.display) {
          displayClub.push({ value: club.id, label: club.clubName });
        } else {
          nondisplayClub.push({ value: club.id, label: club.clubName });
        }
      });

      // 値の初期化
      addDisplayClub.value = null;
      addnonDisplayClub.value = null;
      newclub.value = "";
      clubModal.value = false;
      msgForaddDisplayClub.value = "";
    }
  )
  .subscribe();
// 管理者権限のリアルタイム
const authChannel = supabase
  .channel("table-db-auth")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "profiles",
    },
    async (payload) => {
      ownerList.splice(0, ownerList.length);
      const { data: owners } = await client
        .from("profiles")
        .select("*")
        .eq("authority", true);

      if (owners) {
        owners.map((owner) => {
          ownerList.push(owner);
        });
      }
      open.value = false;
      owner.value = null;
    }
  )
  .subscribe();

const client = useSupabaseClient<Database>();
const open = ref(false);
const clubModal = ref(false);
const deleteUserModal = ref(false);
const deleteCompleteModal = ref(false);
const deleteItem = ref();

//アドベントカレンダーのデータ取得
const { data: advent } = await client.from("banner").select("*");

const { data: showAdvent } = useFetch("/api/advent/getAll");

//初期表示は現在のアドベントとして保存されているもの
const choseAdvent = ref(`${showAdvent.value?.id}`);

//初期表示は現在のアドベントとして保存されているもの
const choseEditAdvent = ref(`${showAdvent.value?.id}`);

//アドベントカレンダーの表示
const registerAdvent = async () => {
  await useFetch("/api/advent/chooseAdvent", {
    method: "POST",
    body: {
      currentAdventValue: showAdvent.value?.id,
      newAdventValue: choseAdvent.value,
    },
  });
  location.reload();
};

//編集するアドベントの選択
const editAdvent = async () => {
  console.log(choseEditAdvent.value);
};

type useClub = {
  label: string;
  value: number;
};
//display:trueのクラブ
const displayClub: useClub[] = reactive([]);
//display:falseのクラブ
const nondisplayClub: useClub[] = reactive([]);

//新規追加クラブ
const newclub = ref("");

const addDisplayClub = ref();
const msgForaddDisplayClub = ref();
const msgForaddnonDisplayClub = ref();
const msgForDeleteClub = ref();
const msgForaddClub = ref();
const addnonDisplayClub = ref();

//　サークル一覧
const { data: allclub } = await useFetch("/api/club/get");

allclub.value?.map((club: Club) => {
  if (club.display) {
    displayClub.push({ value: club.id, label: club.clubName });
  } else {
    nondisplayClub.push({ value: club.id, label: club.clubName });
  }
});

//表示するサークルの追加
const addDisplay = async () => {
  if (addDisplayClub.value === undefined) {
    msgForaddDisplayClub.value = "サークルを選択してください";
  } else {
    await useFetch("/api/club/displayClub", {
      method: "PATCH",
      body: { displayClub: addDisplayClub.value },
    });
  }
};

//サークルを非表示にする
const nonDisplay = async () => {
  if (addnonDisplayClub.value === undefined) {
    msgForaddnonDisplayClub.value = "サークルを選択してください";
  } else {
    await useFetch("/api/club/nonDisplayClub", {
      method: "PATCH",
      body: { nondisplayClub: addnonDisplayClub.value },
    });
  }
};

// サークルの削除可否のモーダルを表示
const displayModalDeleteClub = async () => {
  if (addDisplayClub.value === undefined) {
    msgForDeleteClub.value = "サークルを選択してください";
  } else {
    msgForDeleteClub.value = "";
    clubModal.value = true;
  }
};

//サークルの削除
const deleteClub = async () => {
  const deleteClubId = addDisplayClub.value.id;
  await useFetch(`/api/club/delete?clubid=${deleteClubId}`);
};

//新規クラブの追加
const addNewClub = async () => {
  newclub.value = newclub.value.trim();
  if (!newclub.value) {
    msgForaddClub.value = "追加するサークル名を入力してください";
  } else if (newclub.value.length > 30) {
    msgForaddClub.value = "30字以内で入力してください";
  } else {
    const { data: response } = await useFetch("/api/club/newClub", {
      method: "POST",
      body: { newclub: newclub.value },
    });
    if (response.value === "登録済み") {
      msgForaddClub.value = "このサークルは既に登録されています";
    }
  }
};

//エラーメッセージ
const errormsg = ref("");
const userDeleteErrormsg = ref("");

const ownerList: Profile[] = reactive([]);

//管理者権限あるユーザの取得
const { data: owners } = await client
  .from("profiles")
  .select("*")
  .eq("authority", true);

if (owners) {
  owners.map((owner) => {
    ownerList.push(owner);
  });
}
//新規管理者権限
const owner = ref();
//新規管理者の保存
const submitOwner = async () => {
  errormsg.value = "";
  const re = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@rakus-partners.co.jp/;
  if (!owner.value) {
    errormsg.value = "メールアドレスを入力してください";
  } else {
    //ラクスメールアドレス形式のバリデーション
    if (re.test(owner.value)) {
      const { data } = await useFetch("/api/user/ownerRegister", {
        method: "PATCH",
        body: { email: owner.value },
      });
      if (data.value === "Not Found") {
        errormsg.value = "該当のメールアドレスが見つかりません";
      } else {
        console.log("登録完了");
      }
    } else {
      errormsg.value = "メールアドレスの形式が不正です";
    }
  }
};

//owner権限の削除
const deleteOwner = async (id: number) => {
  await useFetch("/api/user/ownerDelete", {
    method: "PATCH",
    body: { id: id },
  });
};

// 登録ユーザーの削除
const deleteUser = ref("");

const userDeletingValidation = async () => {
  userDeleteErrormsg.value = "";
  const re = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@rakus-partners.co.jp/;
  if (!deleteUser.value) {
    userDeleteErrormsg.value = "メールアドレスを入力してください";
  } else {
    //ラクスメールアドレス形式のバリデーション
    if (re.test(deleteUser.value)) {
      const { data: userExists } = await useFetch("/api/user/confirmExisting", {
        method: "POST",
        body: { email: deleteUser },
      });
      if (userExists.value === "Not Found") {
        userDeleteErrormsg.value = "該当するユーザーが見つかりません";
      } else {
        userDeleteErrormsg.value = "";
        deleteUserModal.value = true;
      }
    } else {
      userDeleteErrormsg.value = "メールアドレスの形式が不正です";
    }
  }
};

const deleteUserRegistration = async () => {
  const { data } = await useFetch("/api/user/deleteRegistration", {
    method: "POST",
    body: { email: deleteUser },
  });
  if (data.value === "OK") {
    deleteUserModal.value = false;
    deleteCompleteModal.value = true;

    setTimeout(function () {
      location.reload();
    }, 1000);
  }
};
</script>

<style>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* background-color: #959393; */
  background-color: rgba(149, 147, 147, 0.3);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 40px;
  border: 1px solid #888;
  width: 300px;
  text-align: center;
}
</style>
