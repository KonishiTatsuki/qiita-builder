<template>
  <!-- {{ $route.params.id }} -->
  <div class="border border-black m-4">
    <div class="flex mt-3">
      <FormKit
        type="form"
        @submit="submitHandler"
        #default="{ value }"
        id="register"
        :actions="false"
      >
        <div class="m-3 p-3">
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
                :value="data[0].username"
              />
            </div>
            <div v-if="!editbool">
              {{ data[0].username }}
            </div>
          </div>
          <div class="flex mb-3">
            メールアドレス：

            <div>
              <p>{{ data[0].email }}</p>
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
                :value="data[0].occupation.id"
              />
            </div>
            <div v-else>
              <p>{{ data[0].occupation.occupationName }}</p>
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
                :value="data[0].clubid.id"
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
            <p v-else>{{ data[0].clubid.clubName }}</p>
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
                :value="data[0].detail"
              />
            </div>
            <div v-else>
              <p>{{ data[0].detail }}</p>
            </div>
          </div>
        </div>
        <button class="btn ml-7" v-show="editbool">保存</button>
      </FormKit>
      <div>
        <!-- <button class="btn mt-44" @click="submitHandler" v-show="editbool">
          保存
        </button> -->
        <div v-show="editbool">
          <!-- <FormKit type="submit" label="保存" /> -->
        </div>
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
  <div class="border border-black m-4 p-3">
    QiitaユーザID:{{ data[0].qiitaToken }}
    <NuxtLink to="/qiitaCoordination">
      <button class="btn">Qiitaと連携する</button></NuxtLink
    >
  </div>
</template>

<script setup>
const editbool = ref(false);
const occupation = [];
const route = useRoute();
const router = useRouter();
const club = [];

const { data: clubb } = await useFetch("/api/club/get");
const { data: occupationn } = await useFetch("/api/occupation/get");

occupationn.value.map((c) => {
  occupation.push({ label: c.occupationName, value: c.id });
});
clubb.value.map((c) => {
  club.push({ label: c.clubName, value: c.id });
});

const submitHandler = async (credentials) => {
  console.log("credentials", credentials);
  await post(credentials);
  edit();
  router.push(`/useredit/${route.params.id}`);
};

const post = async (credentials) => {
  credentials.id = route.params.id;
  await useFetch("/api/user/edit", {
    method: "POST",
    body: credentials,
  });
};
const edit = () => {
  editbool.value = !editbool.value;
};

//profile取得
const { data } = useFetch("/api/user/get", {
  method: "POST",
  body: route.params.id,
});
</script>
