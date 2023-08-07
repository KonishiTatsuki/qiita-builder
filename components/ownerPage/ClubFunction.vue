<template>
  <div class="flex my-20">
    <div class="w-1/5">タグ編集：</div>
    <div class="w-4/5 flex">
      <div class="border border-black p-4 min-w-[420px] mr-2">
        <p class="font-bold">認証済みサークルタグ</p>
        <hr />
        <div class="mt-6">
          <ul class="flex">
            <li v-for="display in displayClub">
              <input
                type="radio"
                :value="`${display.value}`"
                v-model="addnonDisplayClub"
                :id="`nonDisplayclub${display.value}`"
              />{{ display.label }}
            </li>
          </ul>
        </div>
        <div class="text-red-500" id="msgForaddnonDisplayClub">
          {{ msgForaddnonDisplayClub }}
        </div>
        <div class="flex justify-end">
          <div class="mr-2">
            <button
              class="btn p-1"
              @click="nonDisplay"
              id="addnonDisplayClubBtn"
            >
              非表示
            </button>
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
              id="newClub"
            />
          </div>
          <div>
            <button class="ml-2 p-1 btn" @click="addNewClub">追加</button>
          </div>
        </div>
        <div class="mt-3">
          <ul class="flex" id="addDisplayClubSelect">
            <li v-for="display in nondisplayClub">
              <input
                type="radio"
                :value="`${display.value}`"
                v-model="addDisplayClub"
                :id="`displayClub${display.value}`"
              />
              {{ display.label }}
            </li>
          </ul>
        </div>
        <div class="text-red-500" id="msgForaddDisplayClub">
          {{ msgForaddDisplayClub }}
        </div>
        <div class="flex justify-end">
          <div class="mr-2">
            <button class="btn p-1" @click="clubModal = true" id="deleteBtn">
              削除
            </button>
          </div>
          <Teleport to="body" id="modal">
            <div v-if="clubModal" class="modal">
              <div class="modal-content">
                <p class="mb-5">本当に削除しますか？</p>
                <button @click="clubModal = false" class="btn mr-5">No</button>
                <button @click="deleteClub" class="btn" id="deleteConfirmBtn">
                  Yes
                </button>
                <div class="text-red-500">{{ msgForDeleteClub }}</div>
              </div>
            </div>
          </Teleport>
          <div>
            <button class="btn p-1" @click="addDisplay" id="addDisplayClubBtn">
              表示
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

//display:trueのクラブ
const displayClub = reactive([
  { value: "3", label: "バドミントン" },
  { value: "4", label: "テニス" },
  { value: "5", label: "陸上" },
]);
//display:falseのクラブ
const nondisplayClub = reactive([
  { value: "0", label: "バレー" },
  { value: "1", label: "野球" },
  { value: "2", label: "サッカー" },
]);

//新規追加クラブ
const newclub = ref("");

const addDisplayClub = ref("");
const msgForaddDisplayClub = ref();
const msgForaddnonDisplayClub = ref();
const msgForDeleteClub = ref();
const addnonDisplayClub = ref();

//表示するサークルの追加
const addDisplay = async () => {
  if (addDisplayClub.value === undefined) {
    msgForaddDisplayClub.value = "サークルを選択してください";
  } else {
    await axios.patch("/api/club/displayClub", {
      displayClub: addDisplayClub.value,
    });
  }
};

//サークルを非表示にする
const nonDisplay = async () => {
  if (addnonDisplayClub.value === undefined) {
    msgForaddnonDisplayClub.value = "サークルを選択してください";
  } else {
    await axios.patch("/api/club/nonDisplayClub", {
      nondisplayClub: addnonDisplayClub.value,
    });
  }
};

//表示するサークルの削除
const deleteClub = async () => {
  if (addDisplayClub.value === undefined) {
    msgForDeleteClub.value = "サークルを選択してください";
  } else {
    const deleteClubId = addDisplayClub.value.id;
    await axios.delete(`/api/club/delete?clubid=${deleteClubId}`);
  }
};

//新規クラブの追加
const addNewClub = async () => {
  if (!newclub.value) {
    msgForaddDisplayClub.value = "追加するサークル名を入力してください";
  } else if (newclub.value.length > 30) {
    msgForaddDisplayClub.value = "30字以内で入力してください";
  } else {
    const { data: response } = await axios.post("/api/club/newClub", {
      newclub: newclub.value,
    });
    if (response.value === "登録済み") {
      msgForaddDisplayClub.value = "このサークルは既に登録されています";
    }
  }
};
</script>

<style></style>
