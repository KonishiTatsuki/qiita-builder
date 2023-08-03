import addNewClubFunction from "../../components/ownerPage/ClubFunction.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

// MSWでサーバーのモック作成;
const server = setupServer(
  rest.post("/api/club/newClub", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          value: 7,
          label: "フットサル",
        },
      ])
    );
  })
);
beforeAll(() => {
  server.listen();
});
beforeEach(() => {
  jest.restoreAllMocks();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("addDisplayClubFunction", () => {
  test("ページがマウントできているか確認", async () => {
    const wrapper = mount(addNewClubFunction);
    expect(wrapper.text()).toContain("タグ編集：");
  });

  test("何も選択せずにボタンを押下した場合", async () => {
    // コンポーネントのマウント
    const wrapper = mount(addNewClubFunction);
    // // POSTリクエストの実行
    await wrapper.vm.addNewClub();
    const errorMsg = wrapper.vm.msgForaddDisplayClub;
    console.log(wrapper.vm.msgForaddDisplayClub);
    expect(errorMsg).toBe("追加するサークル名を入力してください");
  });
  test("サークル名を31字で記入し、ボタンを押下した場合", async () => {
    // コンポーネントのマウント
    const wrapper = mount(addNewClubFunction);
    // // POSTリクエストの実行
    const inputClub = wrapper.find("#newClub");
    inputClub.setValue(
      "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞた"
    );
    await wrapper.vm.addNewClub();
    const errorMsg = wrapper.vm.msgForaddDisplayClub;
    console.log(wrapper.vm.msgForaddDisplayClub);
    expect(errorMsg).toBe("30字以内で入力してください");
  });

  test("value:1のラジオボタンを選んでボタンを押下", async () => {
    // コンポーネントのマウント
    const wrapper = mount(addNewClubFunction);

    const inputClub = wrapper.find("#newClub");
    inputClub.setValue("フットサル");
    await wrapper.vm.addNewClub();

    const response = await axios.post("/api/club/newClub", {
      label: "フットサル",
    });
    // // 成功メッセージが表示されることを確認
    expect(response.data).toEqual([
      {
        value: 7,
        label: "フットサル",
      },
    ]);
    // // エラーメッセージも表示されていないことを確認
    expect(wrapper.text()).not.toContain("サークルを選択してください");
  });
});
