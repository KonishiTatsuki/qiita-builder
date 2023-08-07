import addDisplayClubFunction from "../../components/ownerPage/ClubFunction.vue"; // テスト対象のページ
import { mount } from "@vue/test-utils";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";

// MSWでサーバーのモック作成;
const server = setupServer(
  rest.patch("/api/club/displayClub", (req, res, ctx) => {
    return res(ctx.json({ message: "Success" }));
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
    const wrapper = mount(addDisplayClubFunction);
    expect(wrapper.text()).toContain("タグ編集：");
  });

  test("何も選択せずにボタンを押下した場合", async () => {
    // コンポーネントのマウント
    const wrapper = mount(addDisplayClubFunction);
    // POSTリクエストの実行
    await wrapper.find("#addDisplayClubBtn").trigger("click");
    const errorMsg = wrapper.vm.msgForaddDisplayClub;
    expect(errorMsg).toBe("サークルを選択してください");
  });

  test("value:1のラジオボタンを選んでボタンを押下", async () => {
    // コンポーネントのマウント
    const wrapper = mount(addDisplayClubFunction);

    // valueが1のラジオボタンを確認
    const radioInput = wrapper.find('input[type="radio"][id="displayClub1"]');
    expect(radioInput.wrapperElement._value.id).toEqual("1");

    //チェックをして、送信
    await radioInput.setChecked();
    await wrapper.find("#addDisplayClubBtn").trigger("click");

    const response = await axios.patch("/api/club/displayClub", {
      displayClub: radioInput.wrapperElement._value.id,
    });
    // 成功メッセージが表示されることを確認
    expect(response.data).toEqual({ message: "Success" });

    // エラーメッセージも表示されていないことを確認
    expect(wrapper.text()).not.toContain("サークルを選択してください");
  });
});
