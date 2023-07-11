<script setup>
import { ref, reactive } from "vue";
const errormsg = ref("");

const ownerList = reactive([]);
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
      const response = await axios.patch(`api/owner/register`, {
        mailAddress: owner.value,
        authority: true,
      });

      if (data && data.length > 0) {
        console.log("完了");
      } else if (data && data.length === 0) {
        errormsg.value = "該当のメールアドレスが見つかりません";
      }
    } else {
      errormsg.value = "メールアドレスの形式が不正です";
    }
  }
};

//owner権限の削除
const deleteOwner = async (id) => {
  await client.from("profiles").upsert({ id: id, authority: false });
};
</script>

<template>
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
                      <button @click="open = false" class="btn mr-5">No</button>
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
</template>
