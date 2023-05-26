<template>
  <h1 class="title">管理者画面</h1>
  <div class="flex items-center">
    <div>バナー表示：</div>
    <div>
      <select name="" id="" class="border border-black">
        <option value="">アドベントカレンダー選択</option>
      </select>
    </div>
    <div class="btn ml-2">保存</div>
  </div>
  <div class="mt-6 flex items-center">
    <div class="flex">
      <div>アドベントカレンダー：</div>
      <div>
        <div><button class="btn mb-3">新規登録</button></div>
        <div>
          <select name="" id="" class="border border-black">
            <option value="">アドベントカレンダー選択</option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex mt-12 ml-2">
      <div><button class="btn">編集</button></div>
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
              type="checkbox"
              :value="{ id: `${display.value}`, display: true }"
              @change="checkclub"
              v-model="addDisplayClub"
            />{{ display.label }}
          </li>
        </ul>
      </div>
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
              @change="checkclub"
              v-model="addnonDisplayClub"
            />{{ display.label }}
          </li>
        </ul>
      </div>
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
        <input type="text" class="border border-black" maxlength="255" />
      </div>
      <div><button class="btn ml-2">保存</button></div>
    </div>
  </div>
  <div class="mt-5">
    <div>管理者一覧：</div>
    <div>
      <table class="border-collapse border border-slate-500 border-spacing-2">
        <tr>
          <td class="border border-slate-500 px-2">
            shuhei.hayakawa@rakus-partners.co.jp
          </td>
          <td class="border border-slate-500 px-2">ユーザ名</td>
          <td class="border border-slate-500 px-2">
            <button class="btn px-2">削除</button>
          </td>
        </tr>
        <tr>
          <td class="border border-slate-500 px-2">
            shuhei.hayakawa@rakus-partners.co.jp
          </td>
          <td class="border border-slate-500 px-2">ユーザ名</td>
          <td class="border border-slate-500 px-2">
            <button class="btn px-2">削除</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const client = useSupabaseClient();
const { data: allclub } = await client.from("club").select();

//display:trueのクラブ
const displayClub = [];
//display:falseのクラブ
const nondisplayClub = [];

//新規追加クラブ
const newclub = ref("");

const addDisplayClub = ref([]);
const addnonDisplayClub = ref([]);

allclub.map((club) => {
  if (club.display) {
    displayClub.push({ value: club.id, label: club.clubName });
  } else {
    nondisplayClub.push({ value: club.id, label: club.clubName });
  }
});

//表示するサークルの追加
const addDisplay = async () => {
  const { error } = await client.from("club").upsert(addDisplayClub.value);
  router.go();
};

//サークルを非表示にする
const nonDisplay = async () => {
  const { error } = await client.from("club").upsert(addnonDisplayClub.value);
  router.go();
};

//表示するサークルの削除
const deleteClub = async () => {
  //削除するサークルの配列
  const clubId = [];
  addDisplayClub.value.map((club) => {
    clubId.push({ id: club.id });
  });
  clubId.map(async (club) => {
    const { error } = await client.from("club").delete().eq("id", club.id);
  });
  router.go();
};

//新規クラブの追加
const addNewClub = async () => {
  const { error: cluberror } = await client.from("club").insert({
    clubName: newclub.value,
  });
  router.go();
};
</script>
